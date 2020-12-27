using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using T5WR.Data;
using T5WR.Models;

namespace T5WR.Controllers
{
    public class GameMsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public GameMsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: GameMs
        public async Task<IActionResult> Index()
        {
            return View(await _context.Game.ToListAsync());
        }

        // GET: GameMs/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var gameM = await _context.Game
                .FirstOrDefaultAsync(m => m.Id == id);
            if (gameM == null)
            {
                return NotFound();
            }

            return View(gameM);
        }

        // GET: GameMs/Create
        public IActionResult Create()
        {
            return View();
        }


        // POST: GameMs/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,GameName,Tags")] GameM gameM)
        {
            if (ModelState.IsValid)
            {
                _context.Add(gameM);
                await _context.SaveChangesAsync();
                return Redirect("/Home/Index");
            }
            return View(gameM);
        }

        // GET: GameMs/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var gameM = await _context.Game.FindAsync(id);
            if (gameM == null)
            {
                return NotFound();
            }
            return View(gameM);
        }

        // POST: GameMs/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,GameName,Tags")] GameM gameM)
        {
            if (id != gameM.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(gameM);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!GameMExists(gameM.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(gameM);
        }

        // GET: GameMs/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var gameM = await _context.Game
                .FirstOrDefaultAsync(m => m.Id == id);
            if (gameM == null)
            {
                return NotFound();
            }

            return View(gameM);
        }

        // POST: GameMs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var gameM = await _context.Game.FindAsync(id);
            _context.Game.Remove(gameM);
            await _context.SaveChangesAsync();
            return Redirect("~/Home/Index");
        }

        private bool GameMExists(int id)
        {
            return _context.Game.Any(e => e.Id == id);
        }
    }
}
