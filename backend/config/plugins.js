module.exports = {
    slugify: {
      enabled:true,
      config: {
        contentTypes: {
          company: {
            field: 'pageslug',
            references: 'hr_number'
          },
          lei: {
            field: 'pageslug',
            references: 'identifier'
          }
        },
        shouldUpdateSlug: true,
        slugifyOptions: {
          separator: '',
          lowercase: false
        }
      }
    },
    upload: {
      config: {
        provider: 'local',
        sizeLimit: 2000000,
      },
    }
};