/*
 * SPDX-License-Identifier: Apache-2.0
 */
import { Object, Property } from 'fabric-contract-api';

// use an interface to share the definition with client code
export interface IChangeProducerEvent {
  docType: string;
  id: string;
  newProducerId: string;
  transactionDate: Date;
}

@Object()
export class ChangeProducerEvent implements IChangeProducerEvent {
  @Property()
  public docType: string;

  @Property()
  public id: string;


  @Property()
  public newProducerId: string;

  // @Property()
  public transactionDate: Date;

  public constructor(id: string, newProducerId: string, txDate: Date) {
    this.docType='changeProducerEvent'
    this.id = id;
    this.newProducerId = newProducerId;
    this.transactionDate = txDate;
  }

}
