/*
 * SPDX-License-Identifier: Apache-2.0
 */

// the event change Owner , when the batch chnage hands

import { Object, Property } from 'fabric-contract-api';

// use an interface to share the definition with client code
export interface IAddCertificationEvent {
    batchId: string;
    producerId: string;
    certification: string[];
    //previousOwner: string;
    transactionDate: Date;
    docType: string;
}

@Object()
export class AddCertificationEvent implements IAddCertificationEvent {
    @Property()
    public batchId: string;

    @Property()
    public producerId: string;
    
    // Doute sur le tableau
    @Property()
    public certification: string[];
  //@Property()
  //public previousOwner: string;

  // @Property()
    public transactionDate: Date;

  @Property()
    public docType: string;

  //public constructor(producerId: string, previousOwner: string, type: string, txDate: Date) {
    public constructor(batchId: string, certification:string, txDate: Date) {
    this.batchId = batchId;

    //Doute sur le push
    this.certification.push(certification)
    //this.previousOwner = previousOwner;
    this.transactionDate = txDate;
    this.docType = 'changeOwnerEvent';
    }

}