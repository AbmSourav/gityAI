# GityAI

GityAI is a agentic AI tool that can automate Git workflows.

<br>

## Installation

Download the latest release from the [releases page]()

Add the binary to your PATH or make a alias in `.bashrc` or `.zshrc`:

```bash
alias gityai="path/to/gityai"
```

Then run `gityai` on a newly open terminal to check if the installation was successful.

<br>

## Setup

To setup GityAI, get Gemini API key from [Gemini API](https://aistudio.google.com/apikey).
Then run the below command or create a `.env` file in the project root directory and add the API key: `GEMINI_API_KEY=<your_api_key>`

```bash
gityai setup
```

<br>

## Project initialization
For using GityAI in a project, you need to initialize it in the project directory:

```bash
gityai init
```

<br>

## Usage

```bash
gityai <command> [options]
```
