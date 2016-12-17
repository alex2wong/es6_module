// this is Root Module for Whole app, require lib we need.
import LowPoly from './lowpoly';
// import * as Dashboard from 'dashboard';
import Drone from './drone';

class RootApp {
}

// Static Props..
RootApp.Drone = Drone;
RootApp.LowPoly = LowPoly;

export {
    Drone, LowPoly
}
