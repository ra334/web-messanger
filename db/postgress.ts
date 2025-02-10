import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

import * as users from './schema/users'
import * as reports from './schema/reports'
import * as messages from './schema/messages'
import * as groups from './schema/groups'
import * as groupMembers from './schema/groupMembers'
import * as friends from './schema/friends'
import * as dialogs from './schema/dialogs'
import * as devices from './schema/devices'
import * as blockedUsers from './schema/blockedUsers'
import * as medias from './schema/medias'
import * as accounts from './schema/accounts'
import * as authenticators from './schema/authenticators'
import * as sessions from './schema/sessions'
import * as verificationTokens from './schema/verificationTokens'

export const db = drizzle(
    process.env.DATABASE_URL!,
    {
        schema: {
            ...users,
            ...reports,
            ...messages,
            ...groups,
            ...groupMembers,
            ...friends,
            ...dialogs,
            ...devices,
            ...blockedUsers,
            ...medias,
            ...accounts,
            ...authenticators,
            ...sessions,
            ...verificationTokens,
        }
    }
);