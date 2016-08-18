import { Injectable } from '@angular/core';
import { DomSanitizationService, SafeUrl } from '@angular/platform-browser';
import { Sensor, Signal } from './../util/signal';

// allows use of d3 scripts without compiler complaining
declare var d3: any;

@Injectable()
export class SignalParseService {

    constructor(private sanitizer: DomSanitizationService) { }

    public parseCSV(file: File): Promise<any> {
        return new Promise((resolve,reject) => {
            console.log('via FileReader', file);
            this.fileToString(file)
                .then(str => this.toRows(str))
                .then(rows => this.toSensors(rows))
                .then(signals => resolve(signals))
                .catch(err => reject(err));
        });  
    }

    private fileToString(file: File): Promise<any> {
        return new Promise((resolve,reject) => {
            var reader = new FileReader();

            // return the file contents as a string
            reader.onload = function(event: any) {
                var contents = event.target.result;
                resolve(contents);
            };

            // return an error if anything goes wrong
            reader.onerror = function(event: any) {
                console.error("File could not be read! Code " + event.target.error.code);
                reject(event.target.error);
            };
            // starts reading file, has no return value
            reader.readAsText(file);
        });
    }

    private toRows(contents: string) {
        return new Promise((resolve) => {
            resolve(d3.csvParseRows(contents, function(d, i) {
                var [token, tick, ...dimensions] = d;
                return {
                    token: token,
                    tick: +tick,
                    dimensions: dimensions
                }
            }));
        });
    }

    private toSensors(rows) {
        return new Promise((resolve) => {
            let sensors = {};

            // makes sure there is a Sensor object
            function getSensor(token): Sensor {
                if (!(token in sensors)) {
                    sensors[token] = new Sensor(token);
                }
                return sensors[token];
            }

            for (let row of rows) {
                //skip row if row is empty
                if (!row.token) { 
                    continue;
                }

                let sensor = getSensor(row.token);
                for (var i = 0; i < row.dimensions.length; i++)
                {
                    //if sensor is not syslog or error, convert to number
                    let value = row.dimensions[i];
                    if (sensor.isMessage()) {
                        value = +value;
                    }
                    //create a Reading object, and append to signal
                    let r = {tick: row.tick, value: value};
                    sensor.getSignal(i).append(r);
                }
            }
            console.log('sensors:', sensors);
            resolve(sensors);
        });
    }
}