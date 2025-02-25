# README.md
# Animal Facts CLI
A command-line interface to fetch and store cat and dog facts.

## Installation
```
npm install
```

## Usage
```
npm start -- --animal cat --random     # Fetch a random cat fact
npm start -- --animal dog --random     # Fetch a random dog fact
npm start -- --animal cat --count 3    # Fetch 3 cat facts
npm start -- --animal dog --count 5    # Fetch 5 dog facts
npm start -- --animal cat --list       # Show saved cat facts
npm start -- --animal dog --list       # Show saved dog facts
npm start -- --animal cat --clear      # Clear stored cat facts
npm start -- --animal dog --clear      # Clear stored dog facts
npm start -- --help                    # Show help menu
```

## Features
- Fetch a random cat or dog fact
- Fetch multiple facts at once
- Save facts locally
- Retrieve saved facts by animal type
- Clear stored facts by animal type
- CLI flags for flexible usage

## Testing
Run tests with:
```
npm test
```