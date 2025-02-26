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

To setup and initialize GityAI for a project, get Gemini API key from [Gemini API](https://aistudio.google.com/apikey).
Then run the below command.

```bash
gityai setup -i
```

<br>

## Usage

```bash
gityai <command> [options]
```

## Generate Commit Message
Generate a Git commit message based on the changes made in the project directory:

```bash
gityai cm -s
```
