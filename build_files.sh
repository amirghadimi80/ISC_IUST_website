#!/bin/bash
set -e

python api/manage.py collectstatic --noinput
python api/manage.py migrate --noinput
