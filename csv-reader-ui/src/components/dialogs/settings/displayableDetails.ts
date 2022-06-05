import { User } from '@firebase/auth';

export interface Detail {
    key: string
    value: string
    isCopyable?: boolean
    isEditable?: boolean
}

export const displayableDetails = (user: User): Detail[] => [
    {
        key: 'User ID',
        value: user?.uid as string,
        isCopyable: true,
    },
    {
        key: 'Display Name',
        value: user?.displayName as string,
        isEditable: true,
    },
    {
        key: 'Email',
        value: user?.email as string,
        isCopyable: true,
    }
];

export const metadataDetails = (user: User): Detail[] => [
    {
        key: 'Creation Time',
        value: user?.metadata?.creationTime as string,
    },
    {
        key: 'Last Sign In Time',
        value: user?.metadata?.lastSignInTime as string,
    }
]
