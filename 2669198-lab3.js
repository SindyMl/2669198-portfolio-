
function getMusicTitlesByYear(tracks){
    if (!Array.isArray(tracks) || tracks.length ===0){
        return {};
    }

    const result = {};

    for(const track of tracks){

        if(!track || typeof track.year !== 'number' || isNaN(track.year) || !track.title){
            continue;
        }

        const year = track.year;

        if(!result[year]){
            result[year]=[];
        }

        result[year].push(track.title);
    }

    for (const year in result){
        result[year].sort((a,b) => a.localeCompare(b));
    }

    return result;

}

function filterAndTransformTracks(tracks,criteria={}){
    if (!Array.isArray(tracks) || tracks.length ===0){
        return [];
    }
    const result = [];

    const minYear = criteria.minYear;
    const maxYear = criteria.maxYear;
    const artistFilter = criteria.artist ? criteria.artist.toLowerCase(): null;

    for (const track of tracks){
        if(!track || typeof track.year !== 'number' || isNaN(track.year) || !track.title || !track.artist){
            continue;
        }

        if (minYear !== undefined && track.year < minYear) continue;
        if (maxYear !== undefined && track.year > maxYear) continue;
        if (artistFilter && track.artist.toLowerCase() !== artistFilter) continue;

        const decadeStart= Math.floor(track.year /10) * 10;
        const decade = `${decadeStart}s`;

        result.push({
            title: track.title,
            artist: track.artist,
            year: track.year,
            decade: decade
        });

    }
     
    return result;
    
}

module.exports = {
    getMusicTitlesByYear,
    filterAndTransformTracks
};

