#!/bin/bash

az webapp up \ 
--sku F1 \
--name example-name \ 
--os-type linux \ 
--resource-group example-premade-rg \ 
--location eastus2