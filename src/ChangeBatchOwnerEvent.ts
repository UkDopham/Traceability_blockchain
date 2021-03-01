/*
 * SPDX-License-Identifier: Apache-2.0
 */

// the event change Owner , when the batch chnage hands

import { Object, Property } from 'fabric-contract-api';

// use an interface to share the definition with client code
export interface IChangeOwnerEvent {
    batchId: string;
    producerId: string;
    //previousOwner: string;
    transactionDate: Date;
    docType: string;
}

@Object()
export class ChangeOwnerEvent implements IChangeOwnerEvent {
    @Property()
    public batchId: string;

    @Property()
    public producerId: string;

  //@Property()
  //public previousOwner: string;

  // @Property()
    public transactionDate: Date;

  @Property()
    public docType: string;

  //public constructor(producerId: string, previousOwner: string, type: string, txDate: Date) {
    public constructor(batchId: string,producerId: string, txDate: Date) {
    this.batchId = batchId;
    this.producerId = producerId;
    //this.previousOwner = previousOwner;
    this.transactionDate = txDate;
    this.docType = 'changeOwnerEvent';
    }

}