#!/usr/bin/env bash
# note -- for debugging purposes

mypy --verbose . 2>&1 >/dev/null |
    sed -n '/LOG:  Metadata/q;p' |          # Cut the important top part
    sed 's/^LOG: //' |                      # Remove `LOG: ` prefixes
    sed "s_.*path='\(.*\)py'.*_\1py_" |     # Extract paths
    tail -n +2
