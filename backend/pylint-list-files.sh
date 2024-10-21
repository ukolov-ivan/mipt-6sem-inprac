#!/usr/bin/env bash
# note -- for debugging purposes

pylint --verbose --reports=y . |        # Cut the important part
    awk '/External dependencies/{flag=1; next} /Raw metrics/{flag=0} flag' |
    grep -oP '\(\K[^)]+(?=\))' |        # Extract linted files from parentheses
    tr ',' '\n' |                       # Separate by comma
    sort -u |                           # Sort
    sed 's/^[ \t]*//;s/[ \t]*$//'       # Clean up whitespaces
