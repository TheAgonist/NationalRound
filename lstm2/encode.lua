local json = require 'cjson'
local MIDI = require 'MIDI'
local lfs = require 'lfs'
cmd = torch.CmdLine()
cmd:option('-filename', 'File to be transformed')

opt = cmd:parse(arg)
--print(lfs.currentdir())
local f = assert(io.open(opt.filename, "r"))
local rawdata = MIDI.midi2score(f:read("*all"))
print(json.encode(rawdata))
return json.encode(rawdata);