# Condition-population-script
The Node based utility used to populate icd9 conditions

## Getting Started
```
npm install populate-conditions -g
```

## Usage
```
populate-icd-conditions <mongo-url> <collection-name> <icd10-code-file>
```
## Example
```
populate-icd-conditions mongodb://localhost:27017/dev_consus patientCondition C:\Condition-population-script\icd10cm_codes_2017.txt
```



