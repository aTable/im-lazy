using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using System;
using System.Linq;
using System.Threading.Tasks;
using Your.Namespace.Api.Data;
using Your.Namespace.Api.DataAccess;
using Your.Namespace.Api.DataLoader;
using Your.Namespace.Api.Extensions;

namespace Your.Namespace.Api.Speakers
{
    [ExtendObjectType("Mutation")]
    public class SpeakerMutations
    {

        [UseApplicationDbContext]
        public async Task<AddSpeakerPayload> AddSpeakerAsync(
            AddSpeakerInput input,
            [ScopedService] ApplicationDbContext context)
        {
            var speaker = new Speaker
            {
                Name = input.Name,
                Bio = input.Bio,
                WebSite = input.WebSite
            };

            context.Speakers.Add(speaker);
            await context.SaveChangesAsync();

            return new AddSpeakerPayload(speaker);
        }

        [UseApplicationDbContext]
        public async Task<UpdateSpeakerPayload> UpdateSpeakerAsync(
            UpdateSpeakerInput input,
            [ScopedService] ApplicationDbContext context,
                SpeakerByIdDataLoader speakerById
            )
        {
            var entity = await speakerById.LoadAsync(input.SpeakerId);
            if (entity == null) throw new InvalidOperationException("Not found");
            context.Entry(entity).CurrentValues.SetValues(input);
            
            await context.SaveChangesAsync();

            return new UpdateSpeakerPayload(entity);
        }

        [UseApplicationDbContext]
        public async Task<DeleteSpeakerPayload> DeleteSpeakerAsync(
            DeleteSpeakerInput input,
            [ScopedService] ApplicationDbContext context,
                SpeakerByIdDataLoader speakerById
            )
        {
            var entity = await speakerById.LoadAsync(input.Id);

            context.Speakers.Remove(entity);
            await context.SaveChangesAsync();

            return new DeleteSpeakerPayload(entity);
        }
    }
}
