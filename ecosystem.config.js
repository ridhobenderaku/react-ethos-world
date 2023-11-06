module.exports = {
  apps : [{
    name: 'admin',
    exec_mode: 'fork',
    cwd: '/home/develop/admin',
//    interpreter: 'none',
    script: 'npm start',
//    args: 'serve -s build -p 3000',
    out_file: 'out.log',
    error_file: 'error.log',
    port:'3001',
    watch: true,
    ignore_watch:  ['node_modules']
 }]
}
