import type { ValidationContext } from "graphql";
import type { FieldNode, OperationDefinitionNode } from "graphql/language/ast";
import {
  createComplexityRule,
  createMaxDepthRule,
  createNoIntrospectionRule,
} from "../utils/securityRules";

type ASTVisitorWithOperations = {
  OperationDefinition?: {
    enter?: (node: OperationDefinitionNode) => void;
  };
  Field?: {
    enter?: (node: FieldNode) => void;
  };
};

describe("Security Rules", () => {
  describe("MaxDepthRule", () => {
    const mockContext = {
      reportError: jest.fn(),
    } as unknown as ValidationContext;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should allow queries within depth limit", () => {
      const maxDepthRule = createMaxDepthRule(2);
      const rule = maxDepthRule(mockContext) as ASTVisitorWithOperations;

      const mockNode = {
        selectionSet: {
          selections: [
            {
              selectionSet: {
                selections: [],
              },
            },
          ],
        },
      } as unknown as OperationDefinitionNode;

      rule.OperationDefinition?.enter?.(mockNode);
      expect(mockContext.reportError).not.toHaveBeenCalled();
    });

    it("should reject queries exceeding depth limit", () => {
      const maxDepthRule = createMaxDepthRule(1);
      const rule = maxDepthRule(mockContext) as ASTVisitorWithOperations;

      const mockNode = {
        selectionSet: {
          selections: [
            {
              selectionSet: {
                selections: [
                  {
                    selectionSet: {
                      selections: [],
                    },
                  },
                ],
              },
            },
          ],
        },
      } as unknown as OperationDefinitionNode;

      rule.OperationDefinition?.enter?.(mockNode);
      expect(mockContext.reportError).toHaveBeenCalled();
    });
  });

  describe("NoIntrospectionRule", () => {
    const mockContext = {
      reportError: jest.fn(),
    } as unknown as ValidationContext;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should block introspection queries", () => {
      const noIntrospectionRule = createNoIntrospectionRule();
      const rule = noIntrospectionRule(mockContext) as ASTVisitorWithOperations;

      const schemaNode = {
        kind: "Field",
        name: {
          kind: "Name",
          value: "__schema",
        },
      } as unknown as FieldNode;

      const typeNode = {
        kind: "Field",
        name: {
          kind: "Name",
          value: "__type",
        },
      } as unknown as FieldNode;

      rule.Field?.enter?.(schemaNode);
      expect(mockContext.reportError).toHaveBeenCalledTimes(1);

      jest.clearAllMocks();

      rule.Field?.enter?.(typeNode);
      expect(mockContext.reportError).toHaveBeenCalledTimes(1);
    });

    it("should allow normal queries", () => {
      const noIntrospectionRule = createNoIntrospectionRule();
      const rule = noIntrospectionRule(mockContext) as ASTVisitorWithOperations;

      const mockNode = {
        kind: "Field",
        name: {
          kind: "Name",
          value: "normalField",
        },
      } as unknown as FieldNode;

      rule.Field?.enter?.(mockNode);
      expect(mockContext.reportError).not.toHaveBeenCalled();
    });
  });

  describe("ComplexityRule", () => {
    const mockContext = {
      reportError: jest.fn(),
    } as unknown as ValidationContext;

    it("should calculate query complexity correctly", () => {
      const complexityRule = createComplexityRule({
        scalarCost: 1,
        objectCost: 2,
        listFactor: 10,
        maxCost: 100,
      });

      const rule = complexityRule(mockContext) as ASTVisitorWithOperations;

      const mockNode = {
        selectionSet: {
          selections: [
            { type: { kind: "ListType" } },
            { type: { kind: "ObjectType" } },
            {}, // scalar
          ],
        },
      } as unknown as OperationDefinitionNode;

      rule.OperationDefinition?.enter?.(mockNode);
      expect(mockContext.reportError).not.toHaveBeenCalled();
    });

    it("should reject queries exceeding complexity limit", () => {
      const complexityRule = createComplexityRule({
        scalarCost: 1,
        objectCost: 2,
        listFactor: 10,
        maxCost: 5,
      });

      const rule = complexityRule(mockContext) as ASTVisitorWithOperations;

      const mockNode = {
        selectionSet: {
          selections: Array(10).fill({ type: { kind: "ListType" } }),
        },
      } as unknown as OperationDefinitionNode;

      rule.OperationDefinition?.enter?.(mockNode);
      expect(mockContext.reportError).toHaveBeenCalled();
    });
  });
});
