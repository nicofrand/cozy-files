files = require './files'
folders = require './folders'

module.exports =
    'files':
        get: files.all
        post: files.create
    'files/:id':
        get: files.find
        delete: files.destroy
    'files/:id/attach/:name':
        get: files.getAttachment
    'folders':
        post: folders.create
    'folders/:id':
        get: folders.find
        delete: folders.destroy
    'folders/:id/files':
        get: folders.findFiles
    'folders/:id/folders':
        get: folders.findFolders