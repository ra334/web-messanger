import { db } from '@/db/postgress'
import { reports } from '@/db/schema/reports'
import { eq } from 'drizzle-orm'
import {
    Report,
    CreateReport,
    GetReport,
    GetReportsOnUser,
    GetReportsFromUser,
    UpdateReportType,
    UpdateReportNotes,
    UpdateReportStatus,
    DeleteReport
} from './reports'

// create

async function createReport(data: CreateReport): Promise<Report> {
    try {
        const report = await db.insert(reports).values({
            userID: data.userID,
            reportedUserID: data.reportedUserID,
            reportType: data.reportType,
            notes: data.notes
        }).returning()

        return report[0]
    } catch (error) {
        console.error('Creating report error: ', error)
        throw error
    }
}

// read

async function getReport(data: GetReport): Promise<Report> {
    try {
        const report = await db.query.reports.findFirst({
            where: (eq(reports.id, data.id))
        })

        if (!report) {
            throw new Error('Report not found')
        }

        return report
    } catch (error) {
        console.error('Getting report error: ', error)
        throw error
    }
}

async function getReportsOnUser(data: GetReportsOnUser) {
    try {
        const userReports = await db.query.reports.findMany({
            where: (eq(reports.reportedUserID, data.reportedUserID))
        })

        return userReports
    } catch (error) {
        console.error('Getting reports on user error: ', error)
        throw error
    }
}

async function getReportsFromUser(data: GetReportsFromUser) {
    try {
        const reportsFromUser = await db.query.reports.findMany({
            where: (eq(reports.userID, data.userID))
        })

        return reportsFromUser
    } catch (error) {
        console.error('Getting reports from user error: ', error)
        throw error
    }
}

// update

async function updateReportType(data: UpdateReportType) {
    try {
        const reportType = await db
            .update(reports)
            .set({reportType: data.reportedType})
            .where(eq(reports.id, data.id))

        return reportType
    } catch (error) {
        console.error('Updating report type error: ', error)
        throw error
    }
}

async function updateReportNotes(data: UpdateReportNotes) {
    try {
        const reportNotes = await db
            .update(reports)
            .set({notes: data.notes})
            .where(eq(reports.id, data.id))

        return reportNotes
    } catch (error) {
        console.error('Updating report notes error: ', error)
        throw error
    }
}

async function updateReportStatus(data: UpdateReportStatus) {
    try {
        const reportStatus = await db
            .update(reports)
            .set({status: data.status})
            .where(eq(reports.id, data.id))

        return reportStatus
    } catch (error) {
        console.error('Updating report status error: ', error)
        throw error
    }
}

// delete

async function deleteReport(data: DeleteReport) {
    try {
        const report = await db
            .delete(reports)
            .where(eq(reports.id, data.id))

        return report

        return report
    } catch (error) {
        console.error('Deleting report error: ', error)
        throw error
    }
}

export {
    createReport,
    getReport,
    getReportsOnUser,
    getReportsFromUser,
    updateReportType,
    updateReportNotes,
    updateReportStatus,
    deleteReport
}