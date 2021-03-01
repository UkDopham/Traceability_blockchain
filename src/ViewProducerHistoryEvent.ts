/*
 * SPDX-License-Identifier: Apache-2.0
 */
import { Object, Property } from 'fabric-contract-api';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

@Object()
export class ViewProducerHistoryEvent {

  @Property()
  public previousProducerCount: number;

  // @Property()
  public previousProducers?: string[];

  // Property()
  public previousProducerChangeDates?: Date[];

  @Property()
  public currentProducer: string;

  // @Property()
  public currentProducerChangeDate: Date;

  public constructor(count: number, previousProducers: string[], previousProducerChangeDates: Date[], currentProducer: string, currentDate: Date) {
    this.previousProducerCount = count;
    if (count > 0) {
      this.previousProducers = previousProducers;
      this.previousProducerChangeDates = previousProducerChangeDates;
    }
    this.currentProducer = currentProducer;
    this.currentProducerChangeDate = currentDate;
  }
}