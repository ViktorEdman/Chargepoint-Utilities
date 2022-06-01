arp -a | awk '! /IP/ {print "http://"$1"/"}' | while read line; do
    if $(curl -v --silent $line 2>&1 | grep -q "Forgot your password?"); then
        echo "$line is a Master"
    fi
done