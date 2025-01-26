import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

import * as users from './schema/users'
import * as usersVerification from './schema/userVerifications'
import * as reports from './schema/reports'
import * as messages from './schema/messages'
import * as groups from './schema/groups'
import * as groupMembers from './schema/groupMembers'
import * as friends from './schema/friends'
import * as dialogs from './schema/dialogs'
import * as devices from './schema/devices'
import * as blockedUsers from './schema/blockedUsers'
import * as tokens from './schema/tokens'
import * as medias from './schema/medias'

export const db = drizzle(
    process.env.DATABASE_URL!,
    {
        schema: {
            ...users,
            ...usersVerification,
            ...reports,
            ...messages,
            ...groups,
            ...groupMembers,
            ...friends,
            ...dialogs,
            ...devices,
            ...blockedUsers,
            ...tokens,
            ...medias
        }
    }
);