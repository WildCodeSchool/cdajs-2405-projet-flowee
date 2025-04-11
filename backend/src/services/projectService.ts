import { EntityManager } from "typeorm";
import { dataSource } from "../dataSource/dataSource";
import { Project } from "../entities/Project";
import { ProjectStatus } from "../enums/ProjectStatus";

export interface CloseProjectParams {
    date: Date, financialDetails: number[][], validatorEmails: string[],
    validatorComments: string[], quitusDoc?: Uint8Array, billDoc?: Uint8Array,
    triggeredProjects: Project[],

    specialistComment?: string;
}


export class CloseProjectParamsBuilder {
    private date: Date = new Date();
    private financialDetails: number[][] = [];
    private validatorEmails: string[] = [];
    private validatorComments: string[] = [];
    private quitusDoc?: Uint8Array;
    private billDoc?: Uint8Array;
    private triggeredProjects: Project[] = [];

    constructor() {
    }

    static start() {
        return new CloseProjectParamsBuilder();
    }

    public setDate(date: Date): this {
        this.date = date;
        return this;
    }

    public setFinancialDetails(financialDetails: number[][]): this {
        this.financialDetails = financialDetails;
        return this;
    }

    public addValidator(email: string, comment: string): this {
        this.validatorEmails.push(email);
        this.validatorComments.push(comment);
        return this;
    }

    public addValidators(validators: ({ email: string, comment: string })[]): this {
        for (const { email, comment } of validators) {
            this.validatorEmails.push(email);
            this.validatorComments.push(comment);
        }
        return this;
    }

    public setQuitusDoc(quitusDoc: Uint8Array): this {
        this.quitusDoc = quitusDoc;
        return this;
    }

    public setBillDoc(billDoc: Uint8Array): this {
        this.billDoc = billDoc;
        return this;
    }

    public addTriggeredProject(project: Project): this {
        this.triggeredProjects.push(project);
        return this;
    }

    public build(): CloseProjectParams {
        return {
            date: this.date,
            financialDetails: this.financialDetails,
            validatorEmails: this.validatorEmails,
            validatorComments: this.validatorComments,
            quitusDoc: this.quitusDoc,
            billDoc: this.billDoc,
            triggeredProjects: this.triggeredProjects,
        };
    }
}

export class ProjectService {

    async closeProject(project: Project, params: CloseProjectParams) {

        try {
            await dataSource.transaction(async (entityManager: EntityManager) => {

                await this.saveDocsToStorage(project, params);
                await this.sendEmails(project, params);
                await this.notifyValidators(project, params);

                await this.prepareNewTriggeredProjects(project, params);

                project.setStatus(ProjectStatus.CLOSED);
                await entityManager.save(project);
            });

        } catch (e) {
            this.logger.error("an error occurred during project close", e);
            await this.deleteDocsFromStorage(project, params);
            await this.tryCancelEmails(project, params);
        }


    }

    private async sendEmails(project: Project, params: CloseProjectParams) {
        let emailBody = "Project done, congrats";
        emailBody += "You have comments from " + validatorEmails.join(', ');
        emailBody += validatorComments.join('<br/>- ');
        if (triggeredProjects.length > 0) {
            emailBody += "Relevant projects may start: " + triggeredProjects.map(project => project.projectName).join(', ');
        }
        const clientEmail: string | undefined = project.client?.account?.email;
        if (clientEmail) {
            this.emailService.sendEmail(clientEmail, "Project " + project.projectName + " done", emailBody, quitusDoc, billDoc);
        }
    }

    private async tryCancelEmails(project: Project, params: CloseProjectParams) {
        // ...
    }

    private async saveDocsToStorage(project: Project, params: CloseProjectParams) {
    }
    private async deleteDocsFromStorage(project: Project, params: CloseProjectParams) {
        // ...
    }

    private async notifyValidators(project: Project, params: CloseProjectParams) {
    }

    private async prepareNewTriggeredProjects(project: Project, params: CloseProjectParams) {
    }

    async getTriggeredProjects(project: Project): Promise<Project[]> {
        return [];
    }
    async getTopManagerValidations(project: Project): Promise<{ email: string, comment: string }[]> {
        return [];
    }
    private logger: any;
}

const projectService = new ProjectService();
export function getProjectService(): ProjectService {
    return projectService
}