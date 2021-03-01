/*
 * SPDX-License-Identifier: Apache-2.0
 */

 // get the date/timestamp to use with the method ChaincodeStubInterface.GetTxTimestamp() 
 // to get the time when the transaction is processed by the Fabric
export class TimestampMapper {

    /////////////////////////////////////////////////////////////////////////////
    // Returns a JavaScript Date mapping to the protobuf timestamp object passed in (protobuf timestamp data structure, containing integers for seconds and nanos since 1970)
    // @return {!Date}
    // data has this shape:
    // let timestamp: any =
    //   {
    //     "seconds":
    //     {
    //       "low": 1590171534,
    //       "high": 0,
    //       "unsigned": false
    //     },
    //     "nanos": 380000000
    //   }
    /////////////////////////////////////////////////////////////////////////////
    public static toDate(data: any): Date {
      const seconds = data.seconds;
      const nanos = data.nanos;
      return new Date((seconds * 1000) + (nanos / 1000000));
    }
  }