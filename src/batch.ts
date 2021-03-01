/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';

@Object()
export class Batch {

    @Property()
    public batchId: string = '';

    @Property()
    public weight: number;

    @Property()
    public producerId: string = '';

    //@Property()
    //public date: Date;
    // let's create the date with the transaction automatically (CreateBatchEvents)

    @Property()
    public certification?: string[];

    @Property()
    public docType?: string;
    // docType to know the type of transactions/ Events

}
