import { Model } from "libs/model/model";

export class Location extends Model {
  latitude = 0;
  longitude = 0;
  altitude = null;
  accuracy = null;
  altitudeAccuracy = null;
  heading = null;
  speed = null;
}
