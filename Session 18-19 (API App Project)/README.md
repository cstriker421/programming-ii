# README.md
# Animal Facts and Images CLI
A command-line interface to fetch and store cat and dog facts as well as fetch random images and/or videos of dogs, cats, and foxes.

# Why is this useful?
With the world as it is, and grim news continuously presenting themselves on every front, it is necessary to find something that will shine a little light in everyone's life.

And what is better at bringing joy to people than the Internet's Terrible Trio, cats, dogs, and foxes?

This tool is guaranteed to provide users with fun factoids, warm hearts with beautiful pictures, and make you laugh at the shenanigans our furry companions are sure to bring!

## Installation
```
npm install
```

## Usage
```
npm start -- --animal cat --random          # Fetch a random cat fact
npm start -- --animal dog --random          # Fetch a random dog fact
npm start -- --animal cat --count X         # Fetch an inputted number of cat facts (max of 3)
npm start -- --animal dog --count X         # Fetch an inputted number of dog facts (max of 3)
npm start -- --animal cat --list            # Show saved cat facts
npm start -- --animal dog --list            # Show saved dog facts
npm start -- --animal cat --clear           # Clear stored cat facts
npm start -- --animal dog --clear           # Clear stored dog facts
npm start -- --animal cat --image           # Fetches a random cat picture
npm start -- --animal dog --image           # Fetches a random dog picture
npm start -- --animal fox --image           # Fetches a random fox picture
npm start -- --animal cat --image --anim    # Fetches a random cat image that can be animated
npm start -- --animal cat --image --anim    # Fetches a random dog image that can be animated
npm start -- --help                         # Show help menu
```

## Features
- Fetch a random cat or dog fact
- Fetch multiple facts at once
- Save facts locally
- Retrieve saved facts by animal type
- Clear stored facts by animal type
- Fetches pictures of cats, dogs, and foxes, with the option of animated ones for the first two
- CLI flags for flexible usage

## Testing
Run tests with:
```
npm test
```