import reportsModel from '@/db/models/reports-model'
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

class ReportsService {
    async createReport(data: CreateReport): Promise<Report> {
        if (data.userID === data.reportedUserID) {
            throw new Error('You cannot report yourself')
        }

        const report = await reportsModel.createReport(data)

        return report
    }

    async getReport(data: GetReport): Promise<Report> {
        const report = await reportsModel.getReport(data)

        return report
    }

    async getReportsOnUser(data: GetReportsOnUser): Promise<Report[]> {
        const reports = await reportsModel.getReportsOnUser(data)

        return reports
    }

    async getReportsFromUsesr(data: GetReportsFromUser): Promise<Report[]> {
        const reports = await reportsModel.getReportsFromUser(data)

        return reports
    }

    async updateReportType(data: UpdateReportType): Promise<Report> {
        const report = await reportsModel.updateReportType(data)

        return report
    }

    async updateReportNotes(data: UpdateReportNotes): Promise<Report> {
        const report = await reportsModel.updateReportNotes(data)

        return report
    }

    async updateReportStatus(data: UpdateReportStatus): Promise<Report> {
        const report = await reportsModel.updateReportStatus(data)

        return report
    }

    async deleteReport(data: DeleteReport): Promise<Report> {
        const report = await reportsModel.deleteReport(data)

        return report
    }
}

export default new ReportsService()