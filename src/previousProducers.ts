/*
 * SPDX-License-Identifier: Apache-2.0
 */
import { Object, Property } from 'fabric-contract-api';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

@Object()
export class PreviousProducersResult {

  @Property()
  public previousProducerCount: number;

  // @Property()
  public previousProducers?: string[];

  // Property()
  public previousProducingChangeDates?: Date[];

  @Property()
  public currentOwner: string;

  // @Property()
  public currentProducingChangeDate: Date;

  public constructor(count: number, previousProducers: string[], previousProducingChangeDates: Date[], currentOwner: string, currentDate: Date) {
    this.previousProducerCount = count;
    if (count > 0) {
      this.previousProducers = previousProducers;
      this.previousProducingChangeDates = previousProducingChangeDates;
    }
    this.currentOwner = currentOwner;
    this.currentProducingChangeDate = currentDate;
  }
}
