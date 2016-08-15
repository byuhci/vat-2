export class MockDataService {
    createDb() {
        let projects = [
            {name: "Pills", id: 1},
            {name: "Lightsabers", id: 2},
            {name: "Skiing", id: 3},
            {name: "User Study 3 (Car Accidents)", id: 4},
            {name: "Dr. Jones' stuff", id: 42}
        ]
        return {projects};
    }
}