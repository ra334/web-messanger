import { z } from 'zod'
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

const idSchema = z.object({
    id: z.string().uuid()
})

const createReportSchema = z.object({
    userID: z.string().uuid(),
    reportedUserID: z.string().uuid(),
    reportType: z.string(),
    status: z.string(),
    notes: z.string()
})

const reportedUserIDSchema = z.object({
    reportedUserID: z.string().uuid()
})

const userIDSchema = z.object({
    userID: z.string().uuid()
})

const updateReportTypeSchema = z.object({
    ...idSchema.shape,
    reportType: z.string()
})

const updateReportNotesSchema = z.object({
    ...idSchema.shape,
    notes: z.string()
})

const updateReportStatusSchema = z.object({
    ...idSchema.shape,
    status: z.string()
})

class ReportsService {
    private handleValidationError(error: unknown): never {
        if (error instanceof z.ZodError) {
            throw new Error(error.errors[0].message)
        }

        throw error
    }

    async createReport(data: CreateReport): Promise<Report> {
        try {
            const parseData = createReportSchema.parse(data)
            return await reportsModel.createReport(parseData)
        } catch (error: any) {
            this.handleValidationError(error)
        }
    }

    async getReport(data: GetReport): Promise<Report> {
        try {
            const parseData = idSchema.parse(data)
            return await reportsModel.getReport(parseData)
        } catch (error: any) {
            this.handleValidationError(error)
        }
    }

    async getReportsOnUser(data: GetReportsOnUser): Promise<Report[]> {
        try {
            const parseData = reportedUserIDSchema.parse(data)
            return await reportsModel.getReportsOnUser(parseData)
        } catch (error: any) {
            this.handleValidationError(error)
        }
    }

    async getReportsFromUsesr(data: GetReportsFromUser): Promise<Report[]> {
        try {
            const parseData = userIDSchema.parse(data)
            return await reportsModel.getReportsFromUser(parseData)
        } catch (error: any) {
            this.handleValidationError(error)
        }
    }

    async updateReportType(data: UpdateReportType): Promise<Report> {
        try {
            const parseData = updateReportTypeSchema.parse(data)
            return await reportsModel.updateReportType(parseData)
        } catch (error: any) {
            this.handleValidationError(error)
        }
    }

    async updateReportNotes(data: UpdateReportNotes): Promise<Report> {
        try {
            const parseData = updateReportNotesSchema.parse(data)
            return await reportsModel.updateReportNotes(parseData)
        } catch (error: any) {
            this.handleValidationError(error)
        }
    }

    async updateReportStatus(data: UpdateReportStatus): Promise<Report> {
        try {
            const parseData = updateReportStatusSchema.parse(data)
            return await reportsModel.updateReportStatus(data)
        } catch (error: any) {
            this.handleValidationError(error)
        }
    }

    async deleteReport(data: DeleteReport): Promise<Report> {
        try {
            const parseData = idSchema.parse(data)
            return await reportsModel.deleteReport(data)
        } catch (error: any) {
            this.handleValidationError(error)
        }
    }
}

export default new ReportsService()