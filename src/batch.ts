/*
 * SPDX-License-Identifier: Apache-2.0
 */
import { Object, Property } from 'fabric-contract-api';
@Object()
export class Batch {

  @Property()
    public id: string = '';

    @Property()
    public weight?: number;

    @Property()
    public producerId: string = '';

    //@Property()
    //public date: Date;
    // let's create the date with the transaction automatically (CreateBatchEvents)
    
    @Property()
    public type: string='';
    
    @Property()
    public certification?: string[];
  }
