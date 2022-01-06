using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using serv.Models;

namespace serv.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UpdatesController : ControllerBase
    {
        private readonly Repositories.IHtmlRepository _repository;
        public UpdatesController(Repositories.IHtmlRepository repository)
        {
            _repository = repository;
        }
        [HttpGet]
        public async Task<IEnumerable<Html>> Get()
        {
            return await _repository.Get();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Html>> Get(int id)
        {
            return await _repository.Get(id);
        }
        [HttpPost]
        public async Task<ActionResult<Html>> Post([FromBody] Html html)
        {
            var newHtml = await _repository.Create(html);
            return CreatedAtAction(nameof(Get), new { id = newHtml.id }, newHtml);
        }
        [HttpPut]
        public async Task<ActionResult> Put(int id, [FromBody] Html html)
        {
            if (id != html.id)
            {
                return BadRequest();
            }
            await _repository.Update(html);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var todelete = await _repository.Get(id);
            if (todelete == null)
                return NotFound();
            await _repository.Delete(todelete.id);
            return NoContent();
        }
    }
}
