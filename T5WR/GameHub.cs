using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using T5WR.Data;
using Microsoft.AspNetCore.SignalR.Client;

namespace T5WR
{
    public class GameHub : Hub
    {
        public async Task SendMessage(string message, string groupname)
        {
            await Clients.Group(groupname).SendAsync("ReceiveMessage", Context.User.Identity.Name ?? "anonymous", message);
        }

        public async Task CreateRoom(string roomName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        }
    }
}
