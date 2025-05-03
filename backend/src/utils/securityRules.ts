import type { ASTVisitor, ValidationContext } from "graphql";
import { GraphQLError } from "graphql";
import type {
  FieldNode,
  InlineFragmentNode,
  OperationDefinitionNode,
} from "graphql/language/ast";

interface ComplexityConfig {
  scalarCost: number;
  objectCost: number;
  listFactor: number;
  maxCost: number;
}

export function createMaxDepthRule(maxDepth: number) {
  return (context: ValidationContext): ASTVisitor => ({
    OperationDefinition: {
      enter(node: OperationDefinitionNode) {
        const depth = calculateDepth(node);
        if (depth > maxDepth) {
          context.reportError(
            new GraphQLError(
              `Query exceeds maximum depth of ${maxDepth}. Current depth: ${depth}`,
              { nodes: [node] },
            ),
          );
        }
      },
    },
  });
}

export function createNoIntrospectionRule() {
  return (context: ValidationContext): ASTVisitor => ({
    Field: {
      enter(node: FieldNode) {
        if (node.name.value === "__schema" || node.name.value === "__type") {
          context.reportError(
            new GraphQLError("Introspection queries are not allowed", {
              nodes: [node],
            }),
          );
        }
      },
    },
  });
}

export function createComplexityRule(config: ComplexityConfig) {
  return (context: ValidationContext): ASTVisitor => ({
    OperationDefinition: {
      enter(node: OperationDefinitionNode) {
        const complexity = calculateComplexity(node, config);
        if (complexity > config.maxCost) {
          context.reportError(
            new GraphQLError(
              `Query exceeds maximum complexity of ${config.maxCost}. Current complexity: ${complexity}`,
              { nodes: [node] },
            ),
          );
        }
      },
    },
  });
}

function calculateDepth(
  node: OperationDefinitionNode | FieldNode | InlineFragmentNode,
): number {
  if (!node.selectionSet) return 0;

  let maxDepth = 0;
  for (const selection of node.selectionSet.selections) {
    if ("selectionSet" in selection) {
      const depth = calculateDepth(selection);
      maxDepth = Math.max(maxDepth, depth);
    }
  }
  return maxDepth + 1;
}

function calculateComplexity(
  node: OperationDefinitionNode | FieldNode | InlineFragmentNode,
  config: ComplexityConfig,
): number {
  if (!node.selectionSet) return config.scalarCost;

  let complexity = 0;
  for (const selection of node.selectionSet.selections) {
    if ("selectionSet" in selection) {
      complexity += config.objectCost;
      complexity += calculateComplexity(selection, config);
    } else {
      complexity += config.scalarCost;
    }
  }
  return complexity;
}
