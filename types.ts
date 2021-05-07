// Defining card schema interface
export interface CardSchema {
    _id: { $oid: string };
    code: {
        type: string,
        unique: true
    };
    amount: string;
    // user: {
    //     type: string,
    //     ref: 'users'
    // }
}

// Defining transaction schema interface
export interface TransactionSchema {
    _id: { $oid: string };
    card: { $oid: string };
    type: {
        type: string,
        enum: ['deposit','withdraw']
    };
    amount: string
}