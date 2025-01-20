const reportTypes = [
    "spam",
    "abuse",
    "scam",
    "impersonation",
    "offensive",
    "fraud",
    "violence",
    "harassment",
    "nudity",
    "copyright",
    "fake"
]

const reportStatuses = [
    "pending",
    "in_review",
    "resolved",
    "rejected",
    "escalated",
    "closed"
]

interface Report {
    id: string;
    userID: string;
    reportedUserID: string;
    reportType: reportTypes;
    notes: string;
    status: reportStatuses;
    createdAt: Date;
}

interface CreateReport {
    userID: string;
    reportedUserID: string;
    reportType: reportTypes;
    notes: string;
}

interface GetReport {
    id: string;
}

interface GetReportsOnUser {
    reportedUserID: string;
}

interface GetReportsFromUser {
    userID: string;
}

interface UpdateReportType {
    id: string;
    reportedType: reportTypes;
}

interface UpdateReportNotes {
    id: string;
    notes: string;
}

interface UpdateReportStatus {
    id: string;
    status: reportStatuses;
}

interface DeleteReport {
    id: string;
}

export {
    Report,
    CreateReport,
    GetReport,
    GetReportsOnUser,
    GetReportsFromUser,
    UpdateReportType,
    UpdateReportNotes,
    UpdateReportStatus,
    DeleteReport
}