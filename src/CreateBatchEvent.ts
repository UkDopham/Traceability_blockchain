/*
 * SPDX-License-Identifier: Apache-2.0
 */
import { Object, Property } from 'fabric-contract-api';

// use an interface to share the definition with client code
export interface ICreateBatchEvent {
  docType: string;
  weight: number;
  id: string;
  transactionDate: Date;
  producerId:string;
}

@Object()
export class CreateBatchEvent implements ICreateBatchEvent {
  @Property()
  public docType: string;

  @Property()
  public weight: number;

  @Property()
  public id: string;

  @Property()
  public producerId: string;
  // @Property()
  public transactionDate: Date;

  public constructor( id:string,weight: number,txDate: Date, producerId:string) {
    this.docType = 'createBatchEvent';
    this.weight = weight;
    this.id = id;
    this.transactionDate = txDate;
    this.producerId=producerId
  }

}
