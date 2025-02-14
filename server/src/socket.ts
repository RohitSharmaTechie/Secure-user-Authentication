import {Server} from 'socket.io'
import { eventNames } from 'process';
import { votingQueue, votingQueueName } from './jobs/VotingJob.js';


export function setupSocke(io:Server){
    io.on('connection', (socket) => {
        console.log('a new client connected', socket.id);
        socket.on("connect_error", (err) => {
            console.log("connect_error",err);
        })
            //*Listen

            socket.onAny(async(eventName:string , data:any) => {
                if(eventName.startsWith("clashing-")){
                    console.log(` with data ${data}`);
                    await votingQueue.add(votingQueueName , data)
                    socket.broadcast.emit(`clashing-${data?.clashId}`,data)
                }
            })
})

}
