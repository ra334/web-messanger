import { db } from '@/db/postgress'
import { reports } from '@/db/schema/reports'
import { eq } from 'drizzle-orm'
import type {
    Report,
    CreateReport,
    GetReport,
    GetReportsOnUser,
    GetReportsFromUser,
    UpdateReportType,
    UpdateReportNotes,
    UpdateReportStatus,
    DeleteReport
} from '@/types/reports'

class ReportsModel {
    // create

    async createReport(data: CreateReport): Promise<Report> {
        try {
            const report = await db.insert(reports).values({
                userID: data.userID,
                reportedUserID: data.reportedUserID,
                reportType: data.reportType,
                status: data.status,
                notes: data.notes
            }).returning()

            return report[0]
        } catch (error: any) { 
            if (error.message == 'insert or update on table "reports" violates foreign key constraint "reports_user_id_users_id_fk"') {
                throw new Error("User does't exist")
            } else if (error.message == 'insert or update on table "reports" violates foreign key constraint "reports_reported_user_id_users_id_fk"') {
                throw new Error("Reported user does't exist")
            }

            throw error
        }
    }

    // read

    async getReport(data: GetReport): Promise<Report> {
        const report = await db.query.reports.findFirst({
            where: (eq(reports.id, data.id))
        })

        if (!report) {
            throw new Error('Report not found')
        }

        return report
    }

    async getReportsOnUser(data: GetReportsOnUser): Promise<Report[]> {
        const userReports = await db.query.reports.findMany({
            where: (eq(reports.reportedUserID, data.reportedUserID))
        })

        return userReports
    }

    async getReportsFromUser(data: GetReportsFromUser): Promise<Report[]> {
        const reportsFromUser = await db.query.reports.findMany({
            where: (eq(reports.userID, data.userID))
        })

        return reportsFromUser
    }

    // update

    async updateReportType(data: UpdateReportType): Promise<Report> {
        const reportType = await db
            .update(reports)
            .set({reportType: data.reportedType})
            .where(eq(reports.id, data.id))
            .returning()

        if (!reportType[0]) {
            throw new Error('Report not found')
        }

        return reportType[0]
    }

    async updateReportNotes(data: UpdateReportNotes): Promise<Report> {
        const reportNotes = await db
            .update(reports)
            .set({notes: data.notes})
            .where(eq(reports.id, data.id))
            .returning()

        if (!reportNotes[0]) {
            throw new Error('Report not found')
        }

        return reportNotes[0]
    }

    async updateReportStatus(data: UpdateReportStatus): Promise<Report> {
        const reportStatus = await db
            .update(reports)
            .set({status: data.status})
            .where(eq(reports.id, data.id))
            .returning()

        if (!reportStatus[0]) {
            throw new Error('Report not found')
        }

        return reportStatus[0]
    }

    // delete

    async deleteReport(data: DeleteReport): Promise<Report> {
        const report = await db
            .delete(reports)
            .where(eq(reports.id, data.id))
            .returning()

        if (!report[0]) {
            throw new Error('Report not found')
        }

        return report[0]
    }
}

export default new ReportsModel()