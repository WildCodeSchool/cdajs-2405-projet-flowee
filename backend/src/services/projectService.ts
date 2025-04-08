import { EntityManager } from "typeorm";
import { dataSource } from "../dataSource/dataSource";
import { Project } from "../entities/Project";

export class ProjectService {

    async closeProject(project: Project, date: Date, financialDetails: number[][], validatorEmails: string[], validatorComments: string[], quitusDoc?: Uint8Array, billDoc?: Uint8Array, ...triggeredProjects: Project[]) {

        try {
            await dataSource.transaction(async (entityManager: EntityManager) => {

                await this.saveDocsToStorage(project, date, financialDetails, validatorEmails, validatorComments, quitusDoc, billDoc, ...triggeredProjects);
                await this.sendEmails(project, date, financialDetails, validatorEmails, validatorComments, quitusDoc, billDoc, ...triggeredProjects);
                await this.notifyValidators(project, date, financialDetails, validatorEmails, validatorComments, quitusDoc, billDoc, ...triggeredProjects);

                await this.prepareNewTriggeredProjects(project, date, financialDetails, validatorEmails, validatorComments, quitusDoc, billDoc, ...triggeredProjects);

                project.setStatus(ProjectStatus.CLOSED);
                await entityManager.save(project);
            });

        } catch (e) {
            this.logger.error("an error occurred during project close", e);
            await this.deleteDocsFromStorage(project, date, financialDetails, validatorEmails, validatorComments, quitusDoc, billDoc, ...triggeredProjects);
            await this.tryCancelEmails(project, date, financialDetails, validatorEmails, validatorComments, quitusDoc, billDoc, ...triggeredProjects);
        }


    }

    private async sendEmails(project: Project, date: Date, financialDetails: number[][], validatorEmails: string[], validatorComments: string[], quitusDoc?: Uint8Array, billDoc?: Uint8Array, ...triggeredProjects: Project[]) {
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

    private async tryCancelEmails(project: Project, date: Date, financialDetails: number[][], validatorEmails: string[], validatorComments: string[], quitusDoc?: Uint8Array, billDoc?: Uint8Array, ...triggeredProjects: Project[]) {
        // ...
    }

    private async saveDocsToStorage(project: Project, date: Date, financialDetails: number[][], validatorEmails: string[], validatorComments: string[], quitusDoc?: Uint8Array, billDoc?: Uint8Array, ...triggeredProjects: Project[]) {
    }
    private async deleteDocsFromStorage(project: Project, date: Date, financialDetails: number[][], validatorEmails: string[], validatorComments: string[], quitusDoc?: Uint8Array, billDoc?: Uint8Array, ...triggeredProjects: Project[]) {
        // ...
    }

    private async notifyValidators(project: Project, date: Date, financialDetails: number[][], validatorEmails: string[], validatorComments: string[], quitusDoc?: Uint8Array, billDoc?: Uint8Array, ...triggeredProjects: Project[]) {
    }

    private async prepareNewTriggeredProjects(project: Project, date: Date, financialDetails: number[][], validatorEmails: string[], validatorComments: string[], quitusDoc?: Uint8Array, billDoc?: Uint8Array, ...triggeredProjects: Project[]) {
    }

    async getTriggeredProjects(project: Project): Promise<Project[]> {
        return [];
    }
}

const projectService = new ProjectService();
export function getProjectService(): ProjectService {
    return projectService
}