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

thermostatSys(22, 18);
thermostatSys(22, 26);
thermostatSys(22, 22);