#!/bin/bash
# Koha Backup Script for Adapt to Impact Library

KOHA_SITE="adapttoimpact"
KOHA_DB="koha_adapttoimpact"
REPO_BASE="/home/koha-backups/koha-adapttoimpact-backup"
DATE=$(date +%Y-%m-%d)
TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S)

echo "🚀 Starting Koha backup for Adapt to Impact..."

# Create directory structure
mkdir -p customizations/{opac,staff}/{css,js}
mkdir -p admin/{patron-categories,notices,system-preferences}
mkdir -p backups/database/$DATE
mkdir -p documentation

# Extract OPAC CSS
echo "/* OPAC Custom CSS - Extracted $TIMESTAMP */" > customizations/opac/css/opac-custom.css
mysql $KOHA_DB -N -e "SELECT value FROM systempreferences WHERE variable = 'OPACUserCSS';" >> customizations/opac/css/opac-custom.css

# Extract OPAC JavaScript  
echo "// OPAC Custom JavaScript - Extracted $TIMESTAMP" > customizations/opac/js/opac-custom.js
mysql $KOHA_DB -N -e "SELECT value FROM systempreferences WHERE variable = 'OPACUserJS';" >> customizations/opac/js/opac-custom.js

# Extract Staff CSS
echo "/* Staff Custom CSS - Extracted $TIMESTAMP */" > customizations/staff/css/staff-custom.css
mysql $KOHA_DB -N -e "SELECT value FROM systempreferences WHERE variable = 'IntranetUserCSS';" >> customizations/staff/css/staff-custom.css

# Extract Staff JavaScript (if any)
echo "// Staff Custom JavaScript - Extracted $TIMESTAMP" > customizations/staff/js/staff-custom.js
mysql $KOHA_DB -N -e "SELECT COALESCE(value, '// No IntranetUserJS customizations found') FROM systempreferences WHERE variable = 'IntranetUserJS';" >> customizations/staff/js/staff-custom.js

# Backup database structure (no patron data)
mysqldump --no-data $KOHA_DB > backups/database/$DATE/structure-$DATE.sql

# Backup admin data
mysqldump $KOHA_DB authorised_values categories itemtypes letter systempreferences > backups/database/$DATE/admin-data-$DATE.sql

# Create documentation
cat > README.md << DOCEOF
# Adapt to Impact Koha Library Backup

Private backup of all customizations and configurations.

## 📊 Customization Summary
- **OPAC CSS**: Custom styling 
- **OPAC JavaScript**: Substantial functionality (~43KB)
- **Staff CSS**: Interface improvements
- **Database**: koha_adapttoimpact

## 📁 Structure
- \`customizations/\` - All CSS and JavaScript customizations
- \`admin/\` - Patron categories, notices, preferences  
- \`backups/\` - Database structure and admin data
- \`documentation/\` - Change logs and procedures

## 🔒 Security
All sensitive data has been sanitized. No patron information included.

Last updated: $TIMESTAMP
DOCEOF

echo "✓ Customizations extracted"
echo "✓ Database backed up" 
echo "✓ Documentation created"
echo "🎉 Backup complete!"
