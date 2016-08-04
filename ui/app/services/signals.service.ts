import { Injectable } from '@angular/core';
import { DomSanitizationService, SafeUrl } from '@angular/platform-browser';

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
                .then(rows => this.toSignals(rows))
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
                var r = d.slice(2);
                return {
                    token: d[0],
                    tick: +d[1],
                    dimensions: r
                }
            }));
        });
    }

    private toSignals(rows) {
        return new Promise((resolve) => {
            let signals = {}

            // makes sure there is an array to append to
            function checkSignal(token) {
                if (!(token in signals)) {
                    signals[token] = []
                }
            }

            for (let row of rows) {
                //skip row if row is empty
                if (row.token === "") { 
                    continue;
                }
                checkSignal(row.token);
                signals[row.token].push({tick: row.tick, dimensions: row.dimensions});
            }

            resolve(signals);
        });
    }
}