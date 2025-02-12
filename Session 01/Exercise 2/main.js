function thermostatSys(desiredTemp, currentTemp) {
    console.log(`Desired Temperature: ${desiredTemp}°C`);
    console.log(`Current Temperature: ${currentTemp}°C`);

    if (currentTemp < desiredTemp) {
        console.log("Heating");
    } else if (currentTemp > desiredTemp) {
        console.log("Cooling");
    } else {
        console.log("Temperature is optimal");
    }
}

// Example usage:
thermostatSys(22, 18);
thermostatSys(22, 26);
thermostatSys(22, 22);

// Desired Temperature: 22°C
// Current Temperature: 18°C
// Heating

// Desired Temperature: 22°C
// Current Temperature: 26°C
// Cooling

// Desired Temperature: 22°C
// Current Temperature: 22°C
// Temperature is optimal