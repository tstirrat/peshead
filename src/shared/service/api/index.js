/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.API = (function() {

    /**
     * Constructs a new API service.
     * @exports API
     * @classdesc Represents a API
     * @extends $protobuf.rpc.Service
     * @constructor
     * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
     * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
     * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
     */
    function API(rpcImpl, requestDelimited, responseDelimited) {
        $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
    }

    (API.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = API;

    /**
     * Creates new API service using the specified rpc implementation.
     * @function create
     * @memberof API
     * @static
     * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
     * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
     * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
     * @returns {API} RPC service. Useful where requests and/or responses are streamed.
     */
    API.create = function create(rpcImpl, requestDelimited, responseDelimited) {
        return new this(rpcImpl, requestDelimited, responseDelimited);
    };

    /**
     * Callback as used by {@link API#getPlayer}.
     * @memberof API
     * @typedef GetPlayerCallback
     * @type {function}
     * @param {Error|null} error Error, if any
     * @param {Player} [response] Player
     */

    /**
     * Calls GetPlayer.
     * @function getPlayer
     * @memberof API
     * @instance
     * @param {IGetPlayerRequest} request GetPlayerRequest message or plain object
     * @param {API.GetPlayerCallback} callback Node-style callback called with the error, if any, and Player
     * @returns {undefined}
     * @variation 1
     */
    API.prototype.getPlayer = function getPlayer(request, callback) {
        return this.rpcCall(getPlayer, $root.GetPlayerRequest, $root.Player, request, callback);
    };

    /**
     * Calls GetPlayer.
     * @function getPlayer
     * @memberof API
     * @instance
     * @param {IGetPlayerRequest} request GetPlayerRequest message or plain object
     * @returns {Promise<Player>} Promise
     * @variation 2
     */

    /**
     * Callback as used by {@link API#updatePlayer}.
     * @memberof API
     * @typedef UpdatePlayerCallback
     * @type {function}
     * @param {Error|null} error Error, if any
     * @param {Player} [response] Player
     */

    /**
     * Calls UpdatePlayer.
     * @function updatePlayer
     * @memberof API
     * @instance
     * @param {IUpdatePlayerRequest} request UpdatePlayerRequest message or plain object
     * @param {API.UpdatePlayerCallback} callback Node-style callback called with the error, if any, and Player
     * @returns {undefined}
     * @variation 1
     */
    API.prototype.updatePlayer = function updatePlayer(request, callback) {
        return this.rpcCall(updatePlayer, $root.UpdatePlayerRequest, $root.Player, request, callback);
    };

    /**
     * Calls UpdatePlayer.
     * @function updatePlayer
     * @memberof API
     * @instance
     * @param {IUpdatePlayerRequest} request UpdatePlayerRequest message or plain object
     * @returns {Promise<Player>} Promise
     * @variation 2
     */

    /**
     * Callback as used by {@link API#addPlayer}.
     * @memberof API
     * @typedef AddPlayerCallback
     * @type {function}
     * @param {Error|null} error Error, if any
     * @param {Player} [response] Player
     */

    /**
     * Calls AddPlayer.
     * @function addPlayer
     * @memberof API
     * @instance
     * @param {IAddPlayerRequest} request AddPlayerRequest message or plain object
     * @param {API.AddPlayerCallback} callback Node-style callback called with the error, if any, and Player
     * @returns {undefined}
     * @variation 1
     */
    API.prototype.addPlayer = function addPlayer(request, callback) {
        return this.rpcCall(addPlayer, $root.AddPlayerRequest, $root.Player, request, callback);
    };

    /**
     * Calls AddPlayer.
     * @function addPlayer
     * @memberof API
     * @instance
     * @param {IAddPlayerRequest} request AddPlayerRequest message or plain object
     * @returns {Promise<Player>} Promise
     * @variation 2
     */

    return API;
})();

$root.GetPlayerRequest = (function() {

    /**
     * Properties of a GetPlayerRequest.
     * @exports IGetPlayerRequest
     * @interface IGetPlayerRequest
     * @property {string|null} [playerId] GetPlayerRequest playerId
     */

    /**
     * Constructs a new GetPlayerRequest.
     * @exports GetPlayerRequest
     * @classdesc Represents a GetPlayerRequest.
     * @implements IGetPlayerRequest
     * @constructor
     * @param {IGetPlayerRequest=} [properties] Properties to set
     */
    function GetPlayerRequest(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GetPlayerRequest playerId.
     * @member {string} playerId
     * @memberof GetPlayerRequest
     * @instance
     */
    GetPlayerRequest.prototype.playerId = "";

    /**
     * Creates a new GetPlayerRequest instance using the specified properties.
     * @function create
     * @memberof GetPlayerRequest
     * @static
     * @param {IGetPlayerRequest=} [properties] Properties to set
     * @returns {GetPlayerRequest} GetPlayerRequest instance
     */
    GetPlayerRequest.create = function create(properties) {
        return new GetPlayerRequest(properties);
    };

    /**
     * Encodes the specified GetPlayerRequest message. Does not implicitly {@link GetPlayerRequest.verify|verify} messages.
     * @function encode
     * @memberof GetPlayerRequest
     * @static
     * @param {IGetPlayerRequest} message GetPlayerRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GetPlayerRequest.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.playerId != null && message.hasOwnProperty("playerId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.playerId);
        return writer;
    };

    /**
     * Encodes the specified GetPlayerRequest message, length delimited. Does not implicitly {@link GetPlayerRequest.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GetPlayerRequest
     * @static
     * @param {IGetPlayerRequest} message GetPlayerRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GetPlayerRequest.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GetPlayerRequest message from the specified reader or buffer.
     * @function decode
     * @memberof GetPlayerRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GetPlayerRequest} GetPlayerRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GetPlayerRequest.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GetPlayerRequest();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.playerId = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GetPlayerRequest message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GetPlayerRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GetPlayerRequest} GetPlayerRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GetPlayerRequest.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GetPlayerRequest message.
     * @function verify
     * @memberof GetPlayerRequest
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GetPlayerRequest.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.playerId != null && message.hasOwnProperty("playerId"))
            if (!$util.isString(message.playerId))
                return "playerId: string expected";
        return null;
    };

    /**
     * Creates a GetPlayerRequest message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GetPlayerRequest
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GetPlayerRequest} GetPlayerRequest
     */
    GetPlayerRequest.fromObject = function fromObject(object) {
        if (object instanceof $root.GetPlayerRequest)
            return object;
        var message = new $root.GetPlayerRequest();
        if (object.playerId != null)
            message.playerId = String(object.playerId);
        return message;
    };

    /**
     * Creates a plain object from a GetPlayerRequest message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GetPlayerRequest
     * @static
     * @param {GetPlayerRequest} message GetPlayerRequest
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GetPlayerRequest.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.playerId = "";
        if (message.playerId != null && message.hasOwnProperty("playerId"))
            object.playerId = message.playerId;
        return object;
    };

    /**
     * Converts this GetPlayerRequest to JSON.
     * @function toJSON
     * @memberof GetPlayerRequest
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GetPlayerRequest.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GetPlayerRequest;
})();

$root.UpdatePlayerRequest = (function() {

    /**
     * Properties of an UpdatePlayerRequest.
     * @exports IUpdatePlayerRequest
     * @interface IUpdatePlayerRequest
     * @property {string|null} [playerId] UpdatePlayerRequest playerId
     * @property {IPlayer|null} [player] UpdatePlayerRequest player
     */

    /**
     * Constructs a new UpdatePlayerRequest.
     * @exports UpdatePlayerRequest
     * @classdesc Represents an UpdatePlayerRequest.
     * @implements IUpdatePlayerRequest
     * @constructor
     * @param {IUpdatePlayerRequest=} [properties] Properties to set
     */
    function UpdatePlayerRequest(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * UpdatePlayerRequest playerId.
     * @member {string} playerId
     * @memberof UpdatePlayerRequest
     * @instance
     */
    UpdatePlayerRequest.prototype.playerId = "";

    /**
     * UpdatePlayerRequest player.
     * @member {IPlayer|null|undefined} player
     * @memberof UpdatePlayerRequest
     * @instance
     */
    UpdatePlayerRequest.prototype.player = null;

    /**
     * Creates a new UpdatePlayerRequest instance using the specified properties.
     * @function create
     * @memberof UpdatePlayerRequest
     * @static
     * @param {IUpdatePlayerRequest=} [properties] Properties to set
     * @returns {UpdatePlayerRequest} UpdatePlayerRequest instance
     */
    UpdatePlayerRequest.create = function create(properties) {
        return new UpdatePlayerRequest(properties);
    };

    /**
     * Encodes the specified UpdatePlayerRequest message. Does not implicitly {@link UpdatePlayerRequest.verify|verify} messages.
     * @function encode
     * @memberof UpdatePlayerRequest
     * @static
     * @param {IUpdatePlayerRequest} message UpdatePlayerRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UpdatePlayerRequest.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.playerId != null && message.hasOwnProperty("playerId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.playerId);
        if (message.player != null && message.hasOwnProperty("player"))
            $root.Player.encode(message.player, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified UpdatePlayerRequest message, length delimited. Does not implicitly {@link UpdatePlayerRequest.verify|verify} messages.
     * @function encodeDelimited
     * @memberof UpdatePlayerRequest
     * @static
     * @param {IUpdatePlayerRequest} message UpdatePlayerRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UpdatePlayerRequest.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an UpdatePlayerRequest message from the specified reader or buffer.
     * @function decode
     * @memberof UpdatePlayerRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {UpdatePlayerRequest} UpdatePlayerRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UpdatePlayerRequest.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.UpdatePlayerRequest();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.playerId = reader.string();
                break;
            case 2:
                message.player = $root.Player.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an UpdatePlayerRequest message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof UpdatePlayerRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {UpdatePlayerRequest} UpdatePlayerRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UpdatePlayerRequest.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an UpdatePlayerRequest message.
     * @function verify
     * @memberof UpdatePlayerRequest
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    UpdatePlayerRequest.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.playerId != null && message.hasOwnProperty("playerId"))
            if (!$util.isString(message.playerId))
                return "playerId: string expected";
        if (message.player != null && message.hasOwnProperty("player")) {
            var error = $root.Player.verify(message.player);
            if (error)
                return "player." + error;
        }
        return null;
    };

    /**
     * Creates an UpdatePlayerRequest message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof UpdatePlayerRequest
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {UpdatePlayerRequest} UpdatePlayerRequest
     */
    UpdatePlayerRequest.fromObject = function fromObject(object) {
        if (object instanceof $root.UpdatePlayerRequest)
            return object;
        var message = new $root.UpdatePlayerRequest();
        if (object.playerId != null)
            message.playerId = String(object.playerId);
        if (object.player != null) {
            if (typeof object.player !== "object")
                throw TypeError(".UpdatePlayerRequest.player: object expected");
            message.player = $root.Player.fromObject(object.player);
        }
        return message;
    };

    /**
     * Creates a plain object from an UpdatePlayerRequest message. Also converts values to other types if specified.
     * @function toObject
     * @memberof UpdatePlayerRequest
     * @static
     * @param {UpdatePlayerRequest} message UpdatePlayerRequest
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    UpdatePlayerRequest.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.playerId = "";
            object.player = null;
        }
        if (message.playerId != null && message.hasOwnProperty("playerId"))
            object.playerId = message.playerId;
        if (message.player != null && message.hasOwnProperty("player"))
            object.player = $root.Player.toObject(message.player, options);
        return object;
    };

    /**
     * Converts this UpdatePlayerRequest to JSON.
     * @function toJSON
     * @memberof UpdatePlayerRequest
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    UpdatePlayerRequest.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return UpdatePlayerRequest;
})();

$root.AddPlayerRequest = (function() {

    /**
     * Properties of an AddPlayerRequest.
     * @exports IAddPlayerRequest
     * @interface IAddPlayerRequest
     * @property {IPlayer|null} [player] AddPlayerRequest player
     */

    /**
     * Constructs a new AddPlayerRequest.
     * @exports AddPlayerRequest
     * @classdesc Represents an AddPlayerRequest.
     * @implements IAddPlayerRequest
     * @constructor
     * @param {IAddPlayerRequest=} [properties] Properties to set
     */
    function AddPlayerRequest(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AddPlayerRequest player.
     * @member {IPlayer|null|undefined} player
     * @memberof AddPlayerRequest
     * @instance
     */
    AddPlayerRequest.prototype.player = null;

    /**
     * Creates a new AddPlayerRequest instance using the specified properties.
     * @function create
     * @memberof AddPlayerRequest
     * @static
     * @param {IAddPlayerRequest=} [properties] Properties to set
     * @returns {AddPlayerRequest} AddPlayerRequest instance
     */
    AddPlayerRequest.create = function create(properties) {
        return new AddPlayerRequest(properties);
    };

    /**
     * Encodes the specified AddPlayerRequest message. Does not implicitly {@link AddPlayerRequest.verify|verify} messages.
     * @function encode
     * @memberof AddPlayerRequest
     * @static
     * @param {IAddPlayerRequest} message AddPlayerRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AddPlayerRequest.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.player != null && message.hasOwnProperty("player"))
            $root.Player.encode(message.player, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified AddPlayerRequest message, length delimited. Does not implicitly {@link AddPlayerRequest.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AddPlayerRequest
     * @static
     * @param {IAddPlayerRequest} message AddPlayerRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AddPlayerRequest.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AddPlayerRequest message from the specified reader or buffer.
     * @function decode
     * @memberof AddPlayerRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AddPlayerRequest} AddPlayerRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AddPlayerRequest.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AddPlayerRequest();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 2:
                message.player = $root.Player.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an AddPlayerRequest message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AddPlayerRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AddPlayerRequest} AddPlayerRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AddPlayerRequest.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AddPlayerRequest message.
     * @function verify
     * @memberof AddPlayerRequest
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AddPlayerRequest.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.player != null && message.hasOwnProperty("player")) {
            var error = $root.Player.verify(message.player);
            if (error)
                return "player." + error;
        }
        return null;
    };

    /**
     * Creates an AddPlayerRequest message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AddPlayerRequest
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AddPlayerRequest} AddPlayerRequest
     */
    AddPlayerRequest.fromObject = function fromObject(object) {
        if (object instanceof $root.AddPlayerRequest)
            return object;
        var message = new $root.AddPlayerRequest();
        if (object.player != null) {
            if (typeof object.player !== "object")
                throw TypeError(".AddPlayerRequest.player: object expected");
            message.player = $root.Player.fromObject(object.player);
        }
        return message;
    };

    /**
     * Creates a plain object from an AddPlayerRequest message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AddPlayerRequest
     * @static
     * @param {AddPlayerRequest} message AddPlayerRequest
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AddPlayerRequest.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.player = null;
        if (message.player != null && message.hasOwnProperty("player"))
            object.player = $root.Player.toObject(message.player, options);
        return object;
    };

    /**
     * Converts this AddPlayerRequest to JSON.
     * @function toJSON
     * @memberof AddPlayerRequest
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AddPlayerRequest.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AddPlayerRequest;
})();

/**
 * Country enum.
 * @exports Country
 * @enum {string}
 * @property {number} AFGHANISTAN=1 AFGHANISTAN value
 * @property {number} ALBANIA=191 ALBANIA value
 * @property {number} ALGERIA=44 ALGERIA value
 * @property {number} ANDORRA=192 ANDORRA value
 * @property {number} ANGOLA=45 ANGOLA value
 * @property {number} ANTIGUA_AND_BARBUDA=104 ANTIGUA_AND_BARBUDA value
 * @property {number} ARGENTINA=144 ARGENTINA value
 * @property {number} ARMENIA=193 ARMENIA value
 * @property {number} ARUBA=105 ARUBA value
 * @property {number} AUSTRALIA=162 AUSTRALIA value
 * @property {number} AUSTRIA=194 AUSTRIA value
 * @property {number} AZERBAIJAN=195 AZERBAIJAN value
 * @property {number} BAHRAIN=2 BAHRAIN value
 * @property {number} BANGLADESH=3 BANGLADESH value
 * @property {number} BARBADOS=107 BARBADOS value
 * @property {number} BELARUS=196 BELARUS value
 * @property {number} BELGIUM=197 BELGIUM value
 * @property {number} BENIN=46 BENIN value
 * @property {number} BERMUDA=109 BERMUDA value
 * @property {number} BOLIVIA=145 BOLIVIA value
 * @property {number} BOSNIA_AND_HERZEGOVINA=198 BOSNIA_AND_HERZEGOVINA value
 * @property {number} BOTSWANA=47 BOTSWANA value
 * @property {number} BRAZIL=146 BRAZIL value
 * @property {number} BULGARIA=199 BULGARIA value
 * @property {number} BURKINA_FASO=48 BURKINA_FASO value
 * @property {number} BURUNDI=49 BURUNDI value
 * @property {number} CAMEROON=50 CAMEROON value
 * @property {number} CANADA=110 CANADA value
 * @property {number} CAPE_VERDE=51 CAPE_VERDE value
 * @property {number} CENTRAL_AFRICAN_REP=52 CENTRAL_AFRICAN_REP value
 * @property {number} CHAD=53 CHAD value
 * @property {number} CHILE=147 CHILE value
 * @property {number} CHINA=7 CHINA value
 * @property {number} COLOMBIA=148 COLOMBIA value
 * @property {number} CONGO=98 CONGO value
 * @property {number} CONGO_DR=55 CONGO_DR value
 * @property {number} COSTA_RICA=112 COSTA_RICA value
 * @property {number} COTE_D_IVOIRE=56 COTE_D_IVOIRE value
 * @property {number} CROATIA=200 CROATIA value
 * @property {number} CUBA=113 CUBA value
 * @property {number} CURACAO=140 CURACAO value
 * @property {number} CYPRUS=201 CYPRUS value
 * @property {number} CZECH_REPUBLIC=202 CZECH_REPUBLIC value
 * @property {number} DENMARK=203 DENMARK value
 * @property {number} DOMINICAN_REPUBLIC=115 DOMINICAN_REPUBLIC value
 * @property {number} ECUADOR=149 ECUADOR value
 * @property {number} EGYPT=58 EGYPT value
 * @property {number} EL_SALVADOR=116 EL_SALVADOR value
 * @property {number} ENGLAND=204 ENGLAND value
 * @property {number} EQUATORIAL_GUINEA=59 EQUATORIAL_GUINEA value
 * @property {number} ERITREA=60 ERITREA value
 * @property {number} ESTONIA=205 ESTONIA value
 * @property {number} ETHIOPIA=61 ETHIOPIA value
 * @property {number} FAROE_ISLANDS=206 FAROE_ISLANDS value
 * @property {number} FIJI=164 FIJI value
 * @property {number} FINLAND=207 FINLAND value
 * @property {number} FRANCE=208 FRANCE value
 * @property {number} FRENCH_GUIANA=138 FRENCH_GUIANA value
 * @property {number} GABON=62 GABON value
 * @property {number} GEORGIA=209 GEORGIA value
 * @property {number} GERMANY=210 GERMANY value
 * @property {number} GHANA=64 GHANA value
 * @property {number} GREECE=211 GREECE value
 * @property {number} GRENADA=117 GRENADA value
 * @property {number} GUADELOUPE=118 GUADELOUPE value
 * @property {number} GUATEMALA=119 GUATEMALA value
 * @property {number} GUINEA=65 GUINEA value
 * @property {number} GUINEA_BISSAU=66 GUINEA_BISSAU value
 * @property {number} GUYANA=159 GUYANA value
 * @property {number} HAITI=120 HAITI value
 * @property {number} HONDURAS=121 HONDURAS value
 * @property {number} HUNGARY=212 HUNGARY value
 * @property {number} ICELAND=213 ICELAND value
 * @property {number} INDIA=9 INDIA value
 * @property {number} INDONESIA=10 INDONESIA value
 * @property {number} IRAN=11 IRAN value
 * @property {number} IRAQ=12 IRAQ value
 * @property {number} IRELAND=214 IRELAND value
 * @property {number} ISRAEL=189 ISRAEL value
 * @property {number} ITALY=215 ITALY value
 * @property {number} JAMAICA=122 JAMAICA value
 * @property {number} JAPAN=13 JAPAN value
 * @property {number} JORDAN=14 JORDAN value
 * @property {number} KAZAKHSTAN=216 KAZAKHSTAN value
 * @property {number} KENYA=67 KENYA value
 * @property {number} KOSOVO=311 KOSOVO value
 * @property {number} KUWAIT=17 KUWAIT value
 * @property {number} KYRGYZ_REPUBLIC=40 KYRGYZ_REPUBLIC value
 * @property {number} LAOS=18 LAOS value
 * @property {number} LATVIA=217 LATVIA value
 * @property {number} LEBANON=19 LEBANON value
 * @property {number} LIBERIA=69 LIBERIA value
 * @property {number} LIBYA=70 LIBYA value
 * @property {number} LIECHTENSTEIN=218 LIECHTENSTEIN value
 * @property {number} LITHUANIA=219 LITHUANIA value
 * @property {number} LUXEMBOURG=220 LUXEMBOURG value
 * @property {number} MACEDONIA=221 MACEDONIA value
 * @property {number} MADAGASCAR=71 MADAGASCAR value
 * @property {number} MALAWI=72 MALAWI value
 * @property {number} MALAYSIA=21 MALAYSIA value
 * @property {number} MALDIVES=22 MALDIVES value
 * @property {number} MALI=73 MALI value
 * @property {number} MALTA=222 MALTA value
 * @property {number} MARTINIQUE=123 MARTINIQUE value
 * @property {number} MAURITANIA=74 MAURITANIA value
 * @property {number} MAURITIUS=75 MAURITIUS value
 * @property {number} MEXICO=124 MEXICO value
 * @property {number} MOLDOVA=223 MOLDOVA value
 * @property {number} MONACO=250 MONACO value
 * @property {number} MONTENEGRO=304 MONTENEGRO value
 * @property {number} MONTSERRAT=125 MONTSERRAT value
 * @property {number} MOROCCO=76 MOROCCO value
 * @property {number} MOZAMBIQUE=77 MOZAMBIQUE value
 * @property {number} NAMIBIA=78 NAMIBIA value
 * @property {number} NETHERLANDS=224 NETHERLANDS value
 * @property {number} NETHERLANDS_ANTILLES=126 NETHERLANDS_ANTILLES value
 * @property {number} NEW_CALEDONIA=165 NEW_CALEDONIA value
 * @property {number} NEW_ZEALAND=166 NEW_ZEALAND value
 * @property {number} NIGER=79 NIGER value
 * @property {number} NIGERIA=80 NIGERIA value
 * @property {number} NORTH_KOREA=15 NORTH_KOREA value
 * @property {number} NORTHERN_IRELAND=225 NORTHERN_IRELAND value
 * @property {number} NORWAY=226 NORWAY value
 * @property {number} OMAN=26 OMAN value
 * @property {number} OTHERS=260 OTHERS value
 * @property {number} PAKISTAN=27 PAKISTAN value
 * @property {number} PALESTINE=28 PALESTINE value
 * @property {number} PANAMA=128 PANAMA value
 * @property {number} PAPUA_NEW_GUINEA=167 PAPUA_NEW_GUINEA value
 * @property {number} PARAGUAY=150 PARAGUAY value
 * @property {number} PERU=151 PERU value
 * @property {number} PHILIPPINES=29 PHILIPPINES value
 * @property {number} POLAND=227 POLAND value
 * @property {number} PORTUGAL=228 PORTUGAL value
 * @property {number} PUERTO_RICO=129 PUERTO_RICO value
 * @property {number} QATAR=30 QATAR value
 * @property {number} REPUBLIC_OF_THE_GAMBIA=63 REPUBLIC_OF_THE_GAMBIA value
 * @property {number} REUNION=100 REUNION value
 * @property {number} ROMANIA=229 ROMANIA value
 * @property {number} RUSSIA=230 RUSSIA value
 * @property {number} RWANDA=81 RWANDA value
 * @property {number} SAMOA=168 SAMOA value
 * @property {number} SAN_MARINO=231 SAN_MARINO value
 * @property {number} SAUDI_ARABIA=31 SAUDI_ARABIA value
 * @property {number} SCOTLAND=232 SCOTLAND value
 * @property {number} SENEGAL=83 SENEGAL value
 * @property {number} SERBIA=303 SERBIA value
 * @property {number} SIERRA_LEONE=85 SIERRA_LEONE value
 * @property {number} SINGAPORE=32 SINGAPORE value
 * @property {number} SINT_MAARTEN=310 SINT_MAARTEN value
 * @property {number} SLOVAKIA=234 SLOVAKIA value
 * @property {number} SLOVENIA=235 SLOVENIA value
 * @property {number} SOLOMON_ISLANDS=169 SOLOMON_ISLANDS value
 * @property {number} SOMALIA=86 SOMALIA value
 * @property {number} SOUTH_AFRICA=87 SOUTH_AFRICA value
 * @property {number} SOUTH_KOREA=16 SOUTH_KOREA value
 * @property {number} SOUTH_SUDAN=312 SOUTH_SUDAN value
 * @property {number} SPAIN=236 SPAIN value
 * @property {number} SRI_LANKA=33 SRI_LANKA value
 * @property {number} SUDAN=88 SUDAN value
 * @property {number} SWEDEN=237 SWEDEN value
 * @property {number} SWITZERLAND=238 SWITZERLAND value
 * @property {number} SYRIA=34 SYRIA value
 * @property {number} TAHITI=170 TAHITI value
 * @property {number} TAIWAN=298 TAIWAN value
 * @property {number} TAJIKISTAN=41 TAJIKISTAN value
 * @property {number} THAILAND=36 THAILAND value
 * @property {number} THE_COMOROS=54 THE_COMOROS value
 * @property {number} TOGO=91 TOGO value
 * @property {number} TRINIDAD_AND_TOBAGO=133 TRINIDAD_AND_TOBAGO value
 * @property {number} TUNISIA=92 TUNISIA value
 * @property {number} TURKEY=190 TURKEY value
 * @property {number} TURKMENISTAN=42 TURKMENISTAN value
 * @property {number} TURKS_AND_CAICOS_IS=134 TURKS_AND_CAICOS_IS value
 * @property {number} UAE=37 UAE value
 * @property {number} UGANDA=93 UGANDA value
 * @property {number} UKRAINE=239 UKRAINE value
 * @property {number} UNITED_STATES=135 UNITED_STATES value
 * @property {number} URUGUAY=152 URUGUAY value
 * @property {number} UZBEKISTAN=240 UZBEKISTAN value
 * @property {number} VENEZUELA=153 VENEZUELA value
 * @property {number} VIETNAM=38 VIETNAM value
 * @property {number} WALES=241 WALES value
 * @property {number} ZAMBIA=94 ZAMBIA value
 * @property {number} ZIMBABWE=95 ZIMBABWE value
 */
$root.Country = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[1] = "AFGHANISTAN"] = 1;
    values[valuesById[191] = "ALBANIA"] = 191;
    values[valuesById[44] = "ALGERIA"] = 44;
    values[valuesById[192] = "ANDORRA"] = 192;
    values[valuesById[45] = "ANGOLA"] = 45;
    values[valuesById[104] = "ANTIGUA_AND_BARBUDA"] = 104;
    values[valuesById[144] = "ARGENTINA"] = 144;
    values[valuesById[193] = "ARMENIA"] = 193;
    values[valuesById[105] = "ARUBA"] = 105;
    values[valuesById[162] = "AUSTRALIA"] = 162;
    values[valuesById[194] = "AUSTRIA"] = 194;
    values[valuesById[195] = "AZERBAIJAN"] = 195;
    values[valuesById[2] = "BAHRAIN"] = 2;
    values[valuesById[3] = "BANGLADESH"] = 3;
    values[valuesById[107] = "BARBADOS"] = 107;
    values[valuesById[196] = "BELARUS"] = 196;
    values[valuesById[197] = "BELGIUM"] = 197;
    values[valuesById[46] = "BENIN"] = 46;
    values[valuesById[109] = "BERMUDA"] = 109;
    values[valuesById[145] = "BOLIVIA"] = 145;
    values[valuesById[198] = "BOSNIA_AND_HERZEGOVINA"] = 198;
    values[valuesById[47] = "BOTSWANA"] = 47;
    values[valuesById[146] = "BRAZIL"] = 146;
    values[valuesById[199] = "BULGARIA"] = 199;
    values[valuesById[48] = "BURKINA_FASO"] = 48;
    values[valuesById[49] = "BURUNDI"] = 49;
    values[valuesById[50] = "CAMEROON"] = 50;
    values[valuesById[110] = "CANADA"] = 110;
    values[valuesById[51] = "CAPE_VERDE"] = 51;
    values[valuesById[52] = "CENTRAL_AFRICAN_REP"] = 52;
    values[valuesById[53] = "CHAD"] = 53;
    values[valuesById[147] = "CHILE"] = 147;
    values[valuesById[7] = "CHINA"] = 7;
    values[valuesById[148] = "COLOMBIA"] = 148;
    values[valuesById[98] = "CONGO"] = 98;
    values[valuesById[55] = "CONGO_DR"] = 55;
    values[valuesById[112] = "COSTA_RICA"] = 112;
    values[valuesById[56] = "COTE_D_IVOIRE"] = 56;
    values[valuesById[200] = "CROATIA"] = 200;
    values[valuesById[113] = "CUBA"] = 113;
    values[valuesById[140] = "CURACAO"] = 140;
    values[valuesById[201] = "CYPRUS"] = 201;
    values[valuesById[202] = "CZECH_REPUBLIC"] = 202;
    values[valuesById[203] = "DENMARK"] = 203;
    values[valuesById[115] = "DOMINICAN_REPUBLIC"] = 115;
    values[valuesById[149] = "ECUADOR"] = 149;
    values[valuesById[58] = "EGYPT"] = 58;
    values[valuesById[116] = "EL_SALVADOR"] = 116;
    values[valuesById[204] = "ENGLAND"] = 204;
    values[valuesById[59] = "EQUATORIAL_GUINEA"] = 59;
    values[valuesById[60] = "ERITREA"] = 60;
    values[valuesById[205] = "ESTONIA"] = 205;
    values[valuesById[61] = "ETHIOPIA"] = 61;
    values[valuesById[206] = "FAROE_ISLANDS"] = 206;
    values[valuesById[164] = "FIJI"] = 164;
    values[valuesById[207] = "FINLAND"] = 207;
    values[valuesById[208] = "FRANCE"] = 208;
    values[valuesById[138] = "FRENCH_GUIANA"] = 138;
    values[valuesById[62] = "GABON"] = 62;
    values[valuesById[209] = "GEORGIA"] = 209;
    values[valuesById[210] = "GERMANY"] = 210;
    values[valuesById[64] = "GHANA"] = 64;
    values[valuesById[211] = "GREECE"] = 211;
    values[valuesById[117] = "GRENADA"] = 117;
    values[valuesById[118] = "GUADELOUPE"] = 118;
    values[valuesById[119] = "GUATEMALA"] = 119;
    values[valuesById[65] = "GUINEA"] = 65;
    values[valuesById[66] = "GUINEA_BISSAU"] = 66;
    values[valuesById[159] = "GUYANA"] = 159;
    values[valuesById[120] = "HAITI"] = 120;
    values[valuesById[121] = "HONDURAS"] = 121;
    values[valuesById[212] = "HUNGARY"] = 212;
    values[valuesById[213] = "ICELAND"] = 213;
    values[valuesById[9] = "INDIA"] = 9;
    values[valuesById[10] = "INDONESIA"] = 10;
    values[valuesById[11] = "IRAN"] = 11;
    values[valuesById[12] = "IRAQ"] = 12;
    values[valuesById[214] = "IRELAND"] = 214;
    values[valuesById[189] = "ISRAEL"] = 189;
    values[valuesById[215] = "ITALY"] = 215;
    values[valuesById[122] = "JAMAICA"] = 122;
    values[valuesById[13] = "JAPAN"] = 13;
    values[valuesById[14] = "JORDAN"] = 14;
    values[valuesById[216] = "KAZAKHSTAN"] = 216;
    values[valuesById[67] = "KENYA"] = 67;
    values[valuesById[311] = "KOSOVO"] = 311;
    values[valuesById[17] = "KUWAIT"] = 17;
    values[valuesById[40] = "KYRGYZ_REPUBLIC"] = 40;
    values[valuesById[18] = "LAOS"] = 18;
    values[valuesById[217] = "LATVIA"] = 217;
    values[valuesById[19] = "LEBANON"] = 19;
    values[valuesById[69] = "LIBERIA"] = 69;
    values[valuesById[70] = "LIBYA"] = 70;
    values[valuesById[218] = "LIECHTENSTEIN"] = 218;
    values[valuesById[219] = "LITHUANIA"] = 219;
    values[valuesById[220] = "LUXEMBOURG"] = 220;
    values[valuesById[221] = "MACEDONIA"] = 221;
    values[valuesById[71] = "MADAGASCAR"] = 71;
    values[valuesById[72] = "MALAWI"] = 72;
    values[valuesById[21] = "MALAYSIA"] = 21;
    values[valuesById[22] = "MALDIVES"] = 22;
    values[valuesById[73] = "MALI"] = 73;
    values[valuesById[222] = "MALTA"] = 222;
    values[valuesById[123] = "MARTINIQUE"] = 123;
    values[valuesById[74] = "MAURITANIA"] = 74;
    values[valuesById[75] = "MAURITIUS"] = 75;
    values[valuesById[124] = "MEXICO"] = 124;
    values[valuesById[223] = "MOLDOVA"] = 223;
    values[valuesById[250] = "MONACO"] = 250;
    values[valuesById[304] = "MONTENEGRO"] = 304;
    values[valuesById[125] = "MONTSERRAT"] = 125;
    values[valuesById[76] = "MOROCCO"] = 76;
    values[valuesById[77] = "MOZAMBIQUE"] = 77;
    values[valuesById[78] = "NAMIBIA"] = 78;
    values[valuesById[224] = "NETHERLANDS"] = 224;
    values[valuesById[126] = "NETHERLANDS_ANTILLES"] = 126;
    values[valuesById[165] = "NEW_CALEDONIA"] = 165;
    values[valuesById[166] = "NEW_ZEALAND"] = 166;
    values[valuesById[79] = "NIGER"] = 79;
    values[valuesById[80] = "NIGERIA"] = 80;
    values[valuesById[15] = "NORTH_KOREA"] = 15;
    values[valuesById[225] = "NORTHERN_IRELAND"] = 225;
    values[valuesById[226] = "NORWAY"] = 226;
    values[valuesById[26] = "OMAN"] = 26;
    values[valuesById[260] = "OTHERS"] = 260;
    values[valuesById[27] = "PAKISTAN"] = 27;
    values[valuesById[28] = "PALESTINE"] = 28;
    values[valuesById[128] = "PANAMA"] = 128;
    values[valuesById[167] = "PAPUA_NEW_GUINEA"] = 167;
    values[valuesById[150] = "PARAGUAY"] = 150;
    values[valuesById[151] = "PERU"] = 151;
    values[valuesById[29] = "PHILIPPINES"] = 29;
    values[valuesById[227] = "POLAND"] = 227;
    values[valuesById[228] = "PORTUGAL"] = 228;
    values[valuesById[129] = "PUERTO_RICO"] = 129;
    values[valuesById[30] = "QATAR"] = 30;
    values[valuesById[63] = "REPUBLIC_OF_THE_GAMBIA"] = 63;
    values[valuesById[100] = "REUNION"] = 100;
    values[valuesById[229] = "ROMANIA"] = 229;
    values[valuesById[230] = "RUSSIA"] = 230;
    values[valuesById[81] = "RWANDA"] = 81;
    values[valuesById[168] = "SAMOA"] = 168;
    values[valuesById[231] = "SAN_MARINO"] = 231;
    values[valuesById[31] = "SAUDI_ARABIA"] = 31;
    values[valuesById[232] = "SCOTLAND"] = 232;
    values[valuesById[83] = "SENEGAL"] = 83;
    values[valuesById[303] = "SERBIA"] = 303;
    values[valuesById[85] = "SIERRA_LEONE"] = 85;
    values[valuesById[32] = "SINGAPORE"] = 32;
    values[valuesById[310] = "SINT_MAARTEN"] = 310;
    values[valuesById[234] = "SLOVAKIA"] = 234;
    values[valuesById[235] = "SLOVENIA"] = 235;
    values[valuesById[169] = "SOLOMON_ISLANDS"] = 169;
    values[valuesById[86] = "SOMALIA"] = 86;
    values[valuesById[87] = "SOUTH_AFRICA"] = 87;
    values[valuesById[16] = "SOUTH_KOREA"] = 16;
    values[valuesById[312] = "SOUTH_SUDAN"] = 312;
    values[valuesById[236] = "SPAIN"] = 236;
    values[valuesById[33] = "SRI_LANKA"] = 33;
    values[valuesById[88] = "SUDAN"] = 88;
    values[valuesById[237] = "SWEDEN"] = 237;
    values[valuesById[238] = "SWITZERLAND"] = 238;
    values[valuesById[34] = "SYRIA"] = 34;
    values[valuesById[170] = "TAHITI"] = 170;
    values[valuesById[298] = "TAIWAN"] = 298;
    values[valuesById[41] = "TAJIKISTAN"] = 41;
    values[valuesById[36] = "THAILAND"] = 36;
    values[valuesById[54] = "THE_COMOROS"] = 54;
    values[valuesById[91] = "TOGO"] = 91;
    values[valuesById[133] = "TRINIDAD_AND_TOBAGO"] = 133;
    values[valuesById[92] = "TUNISIA"] = 92;
    values[valuesById[190] = "TURKEY"] = 190;
    values[valuesById[42] = "TURKMENISTAN"] = 42;
    values[valuesById[134] = "TURKS_AND_CAICOS_IS"] = 134;
    values[valuesById[37] = "UAE"] = 37;
    values[valuesById[93] = "UGANDA"] = 93;
    values[valuesById[239] = "UKRAINE"] = 239;
    values[valuesById[135] = "UNITED_STATES"] = 135;
    values[valuesById[152] = "URUGUAY"] = 152;
    values[valuesById[240] = "UZBEKISTAN"] = 240;
    values[valuesById[153] = "VENEZUELA"] = 153;
    values[valuesById[38] = "VIETNAM"] = 38;
    values[valuesById[241] = "WALES"] = 241;
    values[valuesById[94] = "ZAMBIA"] = 94;
    values[valuesById[95] = "ZIMBABWE"] = 95;
    return values;
})();

$root.Player = (function() {

    /**
     * Properties of a Player.
     * @exports IPlayer
     * @interface IPlayer
     * @property {string} id Player id
     * @property {string|null} [commentaryId] Player commentaryId
     * @property {string} name Player name
     * @property {string} kitName Player kitName
     * @property {number} age Player age
     * @property {Country} nationality Player nationality
     * @property {Foot} preferredFoot Player preferredFoot
     * @property {IPhysique} physique Player physique
     * @property {IPlayerAbilities} abilities Player abilities
     * @property {IPlayerMotion} motion Player motion
     * @property {boolean} isEdited Player isEdited
     * @property {boolean} isBaseCopy Player isBaseCopy
     * @property {IEdits|null} [edited] Player edited
     * @property {Position} registeredPosition Player registeredPosition
     * @property {PlayingStyle} playingStyle Player playingStyle
     * @property {Array.<Position>|null} [playablePositions] Player playablePositions
     * @property {Array.<ComPlayingStyle>|null} [comPlayingStyles] Player comPlayingStyles
     * @property {Array.<Skill>|null} [playerSkills] Player playerSkills
     * @property {IPlayerAppearance} appearance Player appearance
     * @property {IUnknownOptions|null} [unknowns] Player unknowns
     * @property {string|null} [indexState] Player indexState
     * @property {string|null} [indexError] Player indexError
     */

    /**
     * Constructs a new Player.
     * @exports Player
     * @classdesc Represents a Player.
     * @implements IPlayer
     * @constructor
     * @param {IPlayer=} [properties] Properties to set
     */
    function Player(properties) {
        this.playablePositions = [];
        this.comPlayingStyles = [];
        this.playerSkills = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Player id.
     * @member {string} id
     * @memberof Player
     * @instance
     */
    Player.prototype.id = "";

    /**
     * Player commentaryId.
     * @member {string} commentaryId
     * @memberof Player
     * @instance
     */
    Player.prototype.commentaryId = "";

    /**
     * Player name.
     * @member {string} name
     * @memberof Player
     * @instance
     */
    Player.prototype.name = "";

    /**
     * Player kitName.
     * @member {string} kitName
     * @memberof Player
     * @instance
     */
    Player.prototype.kitName = "";

    /**
     * Player age.
     * @member {number} age
     * @memberof Player
     * @instance
     */
    Player.prototype.age = 0;

    /**
     * Player nationality.
     * @member {Country} nationality
     * @memberof Player
     * @instance
     */
    Player.prototype.nationality = 1;

    /**
     * Player preferredFoot.
     * @member {Foot} preferredFoot
     * @memberof Player
     * @instance
     */
    Player.prototype.preferredFoot = 0;

    /**
     * Player physique.
     * @member {IPhysique} physique
     * @memberof Player
     * @instance
     */
    Player.prototype.physique = null;

    /**
     * Player abilities.
     * @member {IPlayerAbilities} abilities
     * @memberof Player
     * @instance
     */
    Player.prototype.abilities = null;

    /**
     * Player motion.
     * @member {IPlayerMotion} motion
     * @memberof Player
     * @instance
     */
    Player.prototype.motion = null;

    /**
     * Player isEdited.
     * @member {boolean} isEdited
     * @memberof Player
     * @instance
     */
    Player.prototype.isEdited = false;

    /**
     * Player isBaseCopy.
     * @member {boolean} isBaseCopy
     * @memberof Player
     * @instance
     */
    Player.prototype.isBaseCopy = false;

    /**
     * Player edited.
     * @member {IEdits|null|undefined} edited
     * @memberof Player
     * @instance
     */
    Player.prototype.edited = null;

    /**
     * Player registeredPosition.
     * @member {Position} registeredPosition
     * @memberof Player
     * @instance
     */
    Player.prototype.registeredPosition = 8;

    /**
     * Player playingStyle.
     * @member {PlayingStyle} playingStyle
     * @memberof Player
     * @instance
     */
    Player.prototype.playingStyle = 8;

    /**
     * Player playablePositions.
     * @member {Array.<Position>} playablePositions
     * @memberof Player
     * @instance
     */
    Player.prototype.playablePositions = $util.emptyArray;

    /**
     * Player comPlayingStyles.
     * @member {Array.<ComPlayingStyle>} comPlayingStyles
     * @memberof Player
     * @instance
     */
    Player.prototype.comPlayingStyles = $util.emptyArray;

    /**
     * Player playerSkills.
     * @member {Array.<Skill>} playerSkills
     * @memberof Player
     * @instance
     */
    Player.prototype.playerSkills = $util.emptyArray;

    /**
     * Player appearance.
     * @member {IPlayerAppearance} appearance
     * @memberof Player
     * @instance
     */
    Player.prototype.appearance = null;

    /**
     * Player unknowns.
     * @member {IUnknownOptions|null|undefined} unknowns
     * @memberof Player
     * @instance
     */
    Player.prototype.unknowns = null;

    /**
     * Player indexState.
     * @member {string} indexState
     * @memberof Player
     * @instance
     */
    Player.prototype.indexState = "";

    /**
     * Player indexError.
     * @member {string} indexError
     * @memberof Player
     * @instance
     */
    Player.prototype.indexError = "";

    /**
     * Creates a new Player instance using the specified properties.
     * @function create
     * @memberof Player
     * @static
     * @param {IPlayer=} [properties] Properties to set
     * @returns {Player} Player instance
     */
    Player.create = function create(properties) {
        return new Player(properties);
    };

    /**
     * Encodes the specified Player message. Does not implicitly {@link Player.verify|verify} messages.
     * @function encode
     * @memberof Player
     * @static
     * @param {IPlayer} message Player message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Player.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
        if (message.commentaryId != null && message.hasOwnProperty("commentaryId"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.commentaryId);
        writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
        writer.uint32(/* id 4, wireType 2 =*/34).string(message.kitName);
        writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.age);
        writer.uint32(/* id 6, wireType 0 =*/48).int32(message.nationality);
        writer.uint32(/* id 7, wireType 0 =*/56).int32(message.preferredFoot);
        $root.Physique.encode(message.physique, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
        $root.PlayerAbilities.encode(message.abilities, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
        $root.PlayerMotion.encode(message.motion, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
        writer.uint32(/* id 11, wireType 0 =*/88).bool(message.isEdited);
        writer.uint32(/* id 12, wireType 0 =*/96).bool(message.isBaseCopy);
        if (message.edited != null && message.hasOwnProperty("edited"))
            $root.Edits.encode(message.edited, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
        writer.uint32(/* id 14, wireType 0 =*/112).int32(message.registeredPosition);
        writer.uint32(/* id 15, wireType 0 =*/120).int32(message.playingStyle);
        if (message.playablePositions != null && message.playablePositions.length) {
            writer.uint32(/* id 16, wireType 2 =*/130).fork();
            for (var i = 0; i < message.playablePositions.length; ++i)
                writer.int32(message.playablePositions[i]);
            writer.ldelim();
        }
        if (message.comPlayingStyles != null && message.comPlayingStyles.length) {
            writer.uint32(/* id 17, wireType 2 =*/138).fork();
            for (var i = 0; i < message.comPlayingStyles.length; ++i)
                writer.int32(message.comPlayingStyles[i]);
            writer.ldelim();
        }
        if (message.playerSkills != null && message.playerSkills.length) {
            writer.uint32(/* id 18, wireType 2 =*/146).fork();
            for (var i = 0; i < message.playerSkills.length; ++i)
                writer.int32(message.playerSkills[i]);
            writer.ldelim();
        }
        $root.PlayerAppearance.encode(message.appearance, writer.uint32(/* id 19, wireType 2 =*/154).fork()).ldelim();
        if (message.unknowns != null && message.hasOwnProperty("unknowns"))
            $root.UnknownOptions.encode(message.unknowns, writer.uint32(/* id 20, wireType 2 =*/162).fork()).ldelim();
        if (message.indexState != null && message.hasOwnProperty("indexState"))
            writer.uint32(/* id 21, wireType 2 =*/170).string(message.indexState);
        if (message.indexError != null && message.hasOwnProperty("indexError"))
            writer.uint32(/* id 22, wireType 2 =*/178).string(message.indexError);
        return writer;
    };

    /**
     * Encodes the specified Player message, length delimited. Does not implicitly {@link Player.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Player
     * @static
     * @param {IPlayer} message Player message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Player.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Player message from the specified reader or buffer.
     * @function decode
     * @memberof Player
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Player} Player
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Player.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Player();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.string();
                break;
            case 2:
                message.commentaryId = reader.string();
                break;
            case 3:
                message.name = reader.string();
                break;
            case 4:
                message.kitName = reader.string();
                break;
            case 5:
                message.age = reader.uint32();
                break;
            case 6:
                message.nationality = reader.int32();
                break;
            case 7:
                message.preferredFoot = reader.int32();
                break;
            case 8:
                message.physique = $root.Physique.decode(reader, reader.uint32());
                break;
            case 9:
                message.abilities = $root.PlayerAbilities.decode(reader, reader.uint32());
                break;
            case 10:
                message.motion = $root.PlayerMotion.decode(reader, reader.uint32());
                break;
            case 11:
                message.isEdited = reader.bool();
                break;
            case 12:
                message.isBaseCopy = reader.bool();
                break;
            case 13:
                message.edited = $root.Edits.decode(reader, reader.uint32());
                break;
            case 14:
                message.registeredPosition = reader.int32();
                break;
            case 15:
                message.playingStyle = reader.int32();
                break;
            case 16:
                if (!(message.playablePositions && message.playablePositions.length))
                    message.playablePositions = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.playablePositions.push(reader.int32());
                } else
                    message.playablePositions.push(reader.int32());
                break;
            case 17:
                if (!(message.comPlayingStyles && message.comPlayingStyles.length))
                    message.comPlayingStyles = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.comPlayingStyles.push(reader.int32());
                } else
                    message.comPlayingStyles.push(reader.int32());
                break;
            case 18:
                if (!(message.playerSkills && message.playerSkills.length))
                    message.playerSkills = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.playerSkills.push(reader.int32());
                } else
                    message.playerSkills.push(reader.int32());
                break;
            case 19:
                message.appearance = $root.PlayerAppearance.decode(reader, reader.uint32());
                break;
            case 20:
                message.unknowns = $root.UnknownOptions.decode(reader, reader.uint32());
                break;
            case 21:
                message.indexState = reader.string();
                break;
            case 22:
                message.indexError = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("id"))
            throw $util.ProtocolError("missing required 'id'", { instance: message });
        if (!message.hasOwnProperty("name"))
            throw $util.ProtocolError("missing required 'name'", { instance: message });
        if (!message.hasOwnProperty("kitName"))
            throw $util.ProtocolError("missing required 'kitName'", { instance: message });
        if (!message.hasOwnProperty("age"))
            throw $util.ProtocolError("missing required 'age'", { instance: message });
        if (!message.hasOwnProperty("nationality"))
            throw $util.ProtocolError("missing required 'nationality'", { instance: message });
        if (!message.hasOwnProperty("preferredFoot"))
            throw $util.ProtocolError("missing required 'preferredFoot'", { instance: message });
        if (!message.hasOwnProperty("physique"))
            throw $util.ProtocolError("missing required 'physique'", { instance: message });
        if (!message.hasOwnProperty("abilities"))
            throw $util.ProtocolError("missing required 'abilities'", { instance: message });
        if (!message.hasOwnProperty("motion"))
            throw $util.ProtocolError("missing required 'motion'", { instance: message });
        if (!message.hasOwnProperty("isEdited"))
            throw $util.ProtocolError("missing required 'isEdited'", { instance: message });
        if (!message.hasOwnProperty("isBaseCopy"))
            throw $util.ProtocolError("missing required 'isBaseCopy'", { instance: message });
        if (!message.hasOwnProperty("registeredPosition"))
            throw $util.ProtocolError("missing required 'registeredPosition'", { instance: message });
        if (!message.hasOwnProperty("playingStyle"))
            throw $util.ProtocolError("missing required 'playingStyle'", { instance: message });
        if (!message.hasOwnProperty("appearance"))
            throw $util.ProtocolError("missing required 'appearance'", { instance: message });
        return message;
    };

    /**
     * Decodes a Player message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Player
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Player} Player
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Player.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Player message.
     * @function verify
     * @memberof Player
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Player.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isString(message.id))
            return "id: string expected";
        if (message.commentaryId != null && message.hasOwnProperty("commentaryId"))
            if (!$util.isString(message.commentaryId))
                return "commentaryId: string expected";
        if (!$util.isString(message.name))
            return "name: string expected";
        if (!$util.isString(message.kitName))
            return "kitName: string expected";
        if (!$util.isInteger(message.age))
            return "age: integer expected";
        switch (message.nationality) {
        default:
            return "nationality: enum value expected";
        case 1:
        case 191:
        case 44:
        case 192:
        case 45:
        case 104:
        case 144:
        case 193:
        case 105:
        case 162:
        case 194:
        case 195:
        case 2:
        case 3:
        case 107:
        case 196:
        case 197:
        case 46:
        case 109:
        case 145:
        case 198:
        case 47:
        case 146:
        case 199:
        case 48:
        case 49:
        case 50:
        case 110:
        case 51:
        case 52:
        case 53:
        case 147:
        case 7:
        case 148:
        case 98:
        case 55:
        case 112:
        case 56:
        case 200:
        case 113:
        case 140:
        case 201:
        case 202:
        case 203:
        case 115:
        case 149:
        case 58:
        case 116:
        case 204:
        case 59:
        case 60:
        case 205:
        case 61:
        case 206:
        case 164:
        case 207:
        case 208:
        case 138:
        case 62:
        case 209:
        case 210:
        case 64:
        case 211:
        case 117:
        case 118:
        case 119:
        case 65:
        case 66:
        case 159:
        case 120:
        case 121:
        case 212:
        case 213:
        case 9:
        case 10:
        case 11:
        case 12:
        case 214:
        case 189:
        case 215:
        case 122:
        case 13:
        case 14:
        case 216:
        case 67:
        case 311:
        case 17:
        case 40:
        case 18:
        case 217:
        case 19:
        case 69:
        case 70:
        case 218:
        case 219:
        case 220:
        case 221:
        case 71:
        case 72:
        case 21:
        case 22:
        case 73:
        case 222:
        case 123:
        case 74:
        case 75:
        case 124:
        case 223:
        case 250:
        case 304:
        case 125:
        case 76:
        case 77:
        case 78:
        case 224:
        case 126:
        case 165:
        case 166:
        case 79:
        case 80:
        case 15:
        case 225:
        case 226:
        case 26:
        case 260:
        case 27:
        case 28:
        case 128:
        case 167:
        case 150:
        case 151:
        case 29:
        case 227:
        case 228:
        case 129:
        case 30:
        case 63:
        case 100:
        case 229:
        case 230:
        case 81:
        case 168:
        case 231:
        case 31:
        case 232:
        case 83:
        case 303:
        case 85:
        case 32:
        case 310:
        case 234:
        case 235:
        case 169:
        case 86:
        case 87:
        case 16:
        case 312:
        case 236:
        case 33:
        case 88:
        case 237:
        case 238:
        case 34:
        case 170:
        case 298:
        case 41:
        case 36:
        case 54:
        case 91:
        case 133:
        case 92:
        case 190:
        case 42:
        case 134:
        case 37:
        case 93:
        case 239:
        case 135:
        case 152:
        case 240:
        case 153:
        case 38:
        case 241:
        case 94:
        case 95:
            break;
        }
        switch (message.preferredFoot) {
        default:
            return "preferredFoot: enum value expected";
        case 0:
        case 1:
            break;
        }
        {
            var error = $root.Physique.verify(message.physique);
            if (error)
                return "physique." + error;
        }
        {
            var error = $root.PlayerAbilities.verify(message.abilities);
            if (error)
                return "abilities." + error;
        }
        {
            var error = $root.PlayerMotion.verify(message.motion);
            if (error)
                return "motion." + error;
        }
        if (typeof message.isEdited !== "boolean")
            return "isEdited: boolean expected";
        if (typeof message.isBaseCopy !== "boolean")
            return "isBaseCopy: boolean expected";
        if (message.edited != null && message.hasOwnProperty("edited")) {
            var error = $root.Edits.verify(message.edited);
            if (error)
                return "edited." + error;
        }
        switch (message.registeredPosition) {
        default:
            return "registeredPosition: enum value expected";
        case 8:
        case 1:
        case 12:
        case 5:
        case 4:
        case 0:
        case 2:
        case 6:
        case 9:
        case 3:
        case 7:
        case 10:
        case 11:
            break;
        }
        switch (message.playingStyle) {
        default:
            return "playingStyle: enum value expected";
        case 8:
        case 7:
        case 15:
        case 5:
        case 14:
        case 12:
        case 18:
        case 2:
        case 10:
        case 3:
        case 1:
        case 6:
        case 16:
        case 0:
        case 11:
        case 17:
        case 4:
        case 13:
        case 9:
            break;
        }
        if (message.playablePositions != null && message.hasOwnProperty("playablePositions")) {
            if (!Array.isArray(message.playablePositions))
                return "playablePositions: array expected";
            for (var i = 0; i < message.playablePositions.length; ++i)
                switch (message.playablePositions[i]) {
                default:
                    return "playablePositions: enum value[] expected";
                case 8:
                case 1:
                case 12:
                case 5:
                case 4:
                case 0:
                case 2:
                case 6:
                case 9:
                case 3:
                case 7:
                case 10:
                case 11:
                    break;
                }
        }
        if (message.comPlayingStyles != null && message.hasOwnProperty("comPlayingStyles")) {
            if (!Array.isArray(message.comPlayingStyles))
                return "comPlayingStyles: array expected";
            for (var i = 0; i < message.comPlayingStyles.length; ++i)
                switch (message.comPlayingStyles[i]) {
                default:
                    return "comPlayingStyles: enum value[] expected";
                case 5:
                case 3:
                case 4:
                case 6:
                case 1:
                case 2:
                case 0:
                    break;
                }
        }
        if (message.playerSkills != null && message.hasOwnProperty("playerSkills")) {
            if (!Array.isArray(message.playerSkills))
                return "playerSkills: array expected";
            for (var i = 0; i < message.playerSkills.length; ++i)
                switch (message.playerSkills[i]) {
                default:
                    return "playerSkills: enum value[] expected";
                case 24:
                case 9:
                case 25:
                case 4:
                case 27:
                case 11:
                case 1:
                case 20:
                case 6:
                case 10:
                case 8:
                case 7:
                case 19:
                case 17:
                case 18:
                case 21:
                case 22:
                case 2:
                case 12:
                case 15:
                case 14:
                case 16:
                case 0:
                case 5:
                case 3:
                case 26:
                case 23:
                case 13:
                    break;
                }
        }
        {
            var error = $root.PlayerAppearance.verify(message.appearance);
            if (error)
                return "appearance." + error;
        }
        if (message.unknowns != null && message.hasOwnProperty("unknowns")) {
            var error = $root.UnknownOptions.verify(message.unknowns);
            if (error)
                return "unknowns." + error;
        }
        if (message.indexState != null && message.hasOwnProperty("indexState"))
            if (!$util.isString(message.indexState))
                return "indexState: string expected";
        if (message.indexError != null && message.hasOwnProperty("indexError"))
            if (!$util.isString(message.indexError))
                return "indexError: string expected";
        return null;
    };

    /**
     * Creates a Player message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Player
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Player} Player
     */
    Player.fromObject = function fromObject(object) {
        if (object instanceof $root.Player)
            return object;
        var message = new $root.Player();
        if (object.id != null)
            message.id = String(object.id);
        if (object.commentaryId != null)
            message.commentaryId = String(object.commentaryId);
        if (object.name != null)
            message.name = String(object.name);
        if (object.kitName != null)
            message.kitName = String(object.kitName);
        if (object.age != null)
            message.age = object.age >>> 0;
        switch (object.nationality) {
        case "AFGHANISTAN":
        case 1:
            message.nationality = 1;
            break;
        case "ALBANIA":
        case 191:
            message.nationality = 191;
            break;
        case "ALGERIA":
        case 44:
            message.nationality = 44;
            break;
        case "ANDORRA":
        case 192:
            message.nationality = 192;
            break;
        case "ANGOLA":
        case 45:
            message.nationality = 45;
            break;
        case "ANTIGUA_AND_BARBUDA":
        case 104:
            message.nationality = 104;
            break;
        case "ARGENTINA":
        case 144:
            message.nationality = 144;
            break;
        case "ARMENIA":
        case 193:
            message.nationality = 193;
            break;
        case "ARUBA":
        case 105:
            message.nationality = 105;
            break;
        case "AUSTRALIA":
        case 162:
            message.nationality = 162;
            break;
        case "AUSTRIA":
        case 194:
            message.nationality = 194;
            break;
        case "AZERBAIJAN":
        case 195:
            message.nationality = 195;
            break;
        case "BAHRAIN":
        case 2:
            message.nationality = 2;
            break;
        case "BANGLADESH":
        case 3:
            message.nationality = 3;
            break;
        case "BARBADOS":
        case 107:
            message.nationality = 107;
            break;
        case "BELARUS":
        case 196:
            message.nationality = 196;
            break;
        case "BELGIUM":
        case 197:
            message.nationality = 197;
            break;
        case "BENIN":
        case 46:
            message.nationality = 46;
            break;
        case "BERMUDA":
        case 109:
            message.nationality = 109;
            break;
        case "BOLIVIA":
        case 145:
            message.nationality = 145;
            break;
        case "BOSNIA_AND_HERZEGOVINA":
        case 198:
            message.nationality = 198;
            break;
        case "BOTSWANA":
        case 47:
            message.nationality = 47;
            break;
        case "BRAZIL":
        case 146:
            message.nationality = 146;
            break;
        case "BULGARIA":
        case 199:
            message.nationality = 199;
            break;
        case "BURKINA_FASO":
        case 48:
            message.nationality = 48;
            break;
        case "BURUNDI":
        case 49:
            message.nationality = 49;
            break;
        case "CAMEROON":
        case 50:
            message.nationality = 50;
            break;
        case "CANADA":
        case 110:
            message.nationality = 110;
            break;
        case "CAPE_VERDE":
        case 51:
            message.nationality = 51;
            break;
        case "CENTRAL_AFRICAN_REP":
        case 52:
            message.nationality = 52;
            break;
        case "CHAD":
        case 53:
            message.nationality = 53;
            break;
        case "CHILE":
        case 147:
            message.nationality = 147;
            break;
        case "CHINA":
        case 7:
            message.nationality = 7;
            break;
        case "COLOMBIA":
        case 148:
            message.nationality = 148;
            break;
        case "CONGO":
        case 98:
            message.nationality = 98;
            break;
        case "CONGO_DR":
        case 55:
            message.nationality = 55;
            break;
        case "COSTA_RICA":
        case 112:
            message.nationality = 112;
            break;
        case "COTE_D_IVOIRE":
        case 56:
            message.nationality = 56;
            break;
        case "CROATIA":
        case 200:
            message.nationality = 200;
            break;
        case "CUBA":
        case 113:
            message.nationality = 113;
            break;
        case "CURACAO":
        case 140:
            message.nationality = 140;
            break;
        case "CYPRUS":
        case 201:
            message.nationality = 201;
            break;
        case "CZECH_REPUBLIC":
        case 202:
            message.nationality = 202;
            break;
        case "DENMARK":
        case 203:
            message.nationality = 203;
            break;
        case "DOMINICAN_REPUBLIC":
        case 115:
            message.nationality = 115;
            break;
        case "ECUADOR":
        case 149:
            message.nationality = 149;
            break;
        case "EGYPT":
        case 58:
            message.nationality = 58;
            break;
        case "EL_SALVADOR":
        case 116:
            message.nationality = 116;
            break;
        case "ENGLAND":
        case 204:
            message.nationality = 204;
            break;
        case "EQUATORIAL_GUINEA":
        case 59:
            message.nationality = 59;
            break;
        case "ERITREA":
        case 60:
            message.nationality = 60;
            break;
        case "ESTONIA":
        case 205:
            message.nationality = 205;
            break;
        case "ETHIOPIA":
        case 61:
            message.nationality = 61;
            break;
        case "FAROE_ISLANDS":
        case 206:
            message.nationality = 206;
            break;
        case "FIJI":
        case 164:
            message.nationality = 164;
            break;
        case "FINLAND":
        case 207:
            message.nationality = 207;
            break;
        case "FRANCE":
        case 208:
            message.nationality = 208;
            break;
        case "FRENCH_GUIANA":
        case 138:
            message.nationality = 138;
            break;
        case "GABON":
        case 62:
            message.nationality = 62;
            break;
        case "GEORGIA":
        case 209:
            message.nationality = 209;
            break;
        case "GERMANY":
        case 210:
            message.nationality = 210;
            break;
        case "GHANA":
        case 64:
            message.nationality = 64;
            break;
        case "GREECE":
        case 211:
            message.nationality = 211;
            break;
        case "GRENADA":
        case 117:
            message.nationality = 117;
            break;
        case "GUADELOUPE":
        case 118:
            message.nationality = 118;
            break;
        case "GUATEMALA":
        case 119:
            message.nationality = 119;
            break;
        case "GUINEA":
        case 65:
            message.nationality = 65;
            break;
        case "GUINEA_BISSAU":
        case 66:
            message.nationality = 66;
            break;
        case "GUYANA":
        case 159:
            message.nationality = 159;
            break;
        case "HAITI":
        case 120:
            message.nationality = 120;
            break;
        case "HONDURAS":
        case 121:
            message.nationality = 121;
            break;
        case "HUNGARY":
        case 212:
            message.nationality = 212;
            break;
        case "ICELAND":
        case 213:
            message.nationality = 213;
            break;
        case "INDIA":
        case 9:
            message.nationality = 9;
            break;
        case "INDONESIA":
        case 10:
            message.nationality = 10;
            break;
        case "IRAN":
        case 11:
            message.nationality = 11;
            break;
        case "IRAQ":
        case 12:
            message.nationality = 12;
            break;
        case "IRELAND":
        case 214:
            message.nationality = 214;
            break;
        case "ISRAEL":
        case 189:
            message.nationality = 189;
            break;
        case "ITALY":
        case 215:
            message.nationality = 215;
            break;
        case "JAMAICA":
        case 122:
            message.nationality = 122;
            break;
        case "JAPAN":
        case 13:
            message.nationality = 13;
            break;
        case "JORDAN":
        case 14:
            message.nationality = 14;
            break;
        case "KAZAKHSTAN":
        case 216:
            message.nationality = 216;
            break;
        case "KENYA":
        case 67:
            message.nationality = 67;
            break;
        case "KOSOVO":
        case 311:
            message.nationality = 311;
            break;
        case "KUWAIT":
        case 17:
            message.nationality = 17;
            break;
        case "KYRGYZ_REPUBLIC":
        case 40:
            message.nationality = 40;
            break;
        case "LAOS":
        case 18:
            message.nationality = 18;
            break;
        case "LATVIA":
        case 217:
            message.nationality = 217;
            break;
        case "LEBANON":
        case 19:
            message.nationality = 19;
            break;
        case "LIBERIA":
        case 69:
            message.nationality = 69;
            break;
        case "LIBYA":
        case 70:
            message.nationality = 70;
            break;
        case "LIECHTENSTEIN":
        case 218:
            message.nationality = 218;
            break;
        case "LITHUANIA":
        case 219:
            message.nationality = 219;
            break;
        case "LUXEMBOURG":
        case 220:
            message.nationality = 220;
            break;
        case "MACEDONIA":
        case 221:
            message.nationality = 221;
            break;
        case "MADAGASCAR":
        case 71:
            message.nationality = 71;
            break;
        case "MALAWI":
        case 72:
            message.nationality = 72;
            break;
        case "MALAYSIA":
        case 21:
            message.nationality = 21;
            break;
        case "MALDIVES":
        case 22:
            message.nationality = 22;
            break;
        case "MALI":
        case 73:
            message.nationality = 73;
            break;
        case "MALTA":
        case 222:
            message.nationality = 222;
            break;
        case "MARTINIQUE":
        case 123:
            message.nationality = 123;
            break;
        case "MAURITANIA":
        case 74:
            message.nationality = 74;
            break;
        case "MAURITIUS":
        case 75:
            message.nationality = 75;
            break;
        case "MEXICO":
        case 124:
            message.nationality = 124;
            break;
        case "MOLDOVA":
        case 223:
            message.nationality = 223;
            break;
        case "MONACO":
        case 250:
            message.nationality = 250;
            break;
        case "MONTENEGRO":
        case 304:
            message.nationality = 304;
            break;
        case "MONTSERRAT":
        case 125:
            message.nationality = 125;
            break;
        case "MOROCCO":
        case 76:
            message.nationality = 76;
            break;
        case "MOZAMBIQUE":
        case 77:
            message.nationality = 77;
            break;
        case "NAMIBIA":
        case 78:
            message.nationality = 78;
            break;
        case "NETHERLANDS":
        case 224:
            message.nationality = 224;
            break;
        case "NETHERLANDS_ANTILLES":
        case 126:
            message.nationality = 126;
            break;
        case "NEW_CALEDONIA":
        case 165:
            message.nationality = 165;
            break;
        case "NEW_ZEALAND":
        case 166:
            message.nationality = 166;
            break;
        case "NIGER":
        case 79:
            message.nationality = 79;
            break;
        case "NIGERIA":
        case 80:
            message.nationality = 80;
            break;
        case "NORTH_KOREA":
        case 15:
            message.nationality = 15;
            break;
        case "NORTHERN_IRELAND":
        case 225:
            message.nationality = 225;
            break;
        case "NORWAY":
        case 226:
            message.nationality = 226;
            break;
        case "OMAN":
        case 26:
            message.nationality = 26;
            break;
        case "OTHERS":
        case 260:
            message.nationality = 260;
            break;
        case "PAKISTAN":
        case 27:
            message.nationality = 27;
            break;
        case "PALESTINE":
        case 28:
            message.nationality = 28;
            break;
        case "PANAMA":
        case 128:
            message.nationality = 128;
            break;
        case "PAPUA_NEW_GUINEA":
        case 167:
            message.nationality = 167;
            break;
        case "PARAGUAY":
        case 150:
            message.nationality = 150;
            break;
        case "PERU":
        case 151:
            message.nationality = 151;
            break;
        case "PHILIPPINES":
        case 29:
            message.nationality = 29;
            break;
        case "POLAND":
        case 227:
            message.nationality = 227;
            break;
        case "PORTUGAL":
        case 228:
            message.nationality = 228;
            break;
        case "PUERTO_RICO":
        case 129:
            message.nationality = 129;
            break;
        case "QATAR":
        case 30:
            message.nationality = 30;
            break;
        case "REPUBLIC_OF_THE_GAMBIA":
        case 63:
            message.nationality = 63;
            break;
        case "REUNION":
        case 100:
            message.nationality = 100;
            break;
        case "ROMANIA":
        case 229:
            message.nationality = 229;
            break;
        case "RUSSIA":
        case 230:
            message.nationality = 230;
            break;
        case "RWANDA":
        case 81:
            message.nationality = 81;
            break;
        case "SAMOA":
        case 168:
            message.nationality = 168;
            break;
        case "SAN_MARINO":
        case 231:
            message.nationality = 231;
            break;
        case "SAUDI_ARABIA":
        case 31:
            message.nationality = 31;
            break;
        case "SCOTLAND":
        case 232:
            message.nationality = 232;
            break;
        case "SENEGAL":
        case 83:
            message.nationality = 83;
            break;
        case "SERBIA":
        case 303:
            message.nationality = 303;
            break;
        case "SIERRA_LEONE":
        case 85:
            message.nationality = 85;
            break;
        case "SINGAPORE":
        case 32:
            message.nationality = 32;
            break;
        case "SINT_MAARTEN":
        case 310:
            message.nationality = 310;
            break;
        case "SLOVAKIA":
        case 234:
            message.nationality = 234;
            break;
        case "SLOVENIA":
        case 235:
            message.nationality = 235;
            break;
        case "SOLOMON_ISLANDS":
        case 169:
            message.nationality = 169;
            break;
        case "SOMALIA":
        case 86:
            message.nationality = 86;
            break;
        case "SOUTH_AFRICA":
        case 87:
            message.nationality = 87;
            break;
        case "SOUTH_KOREA":
        case 16:
            message.nationality = 16;
            break;
        case "SOUTH_SUDAN":
        case 312:
            message.nationality = 312;
            break;
        case "SPAIN":
        case 236:
            message.nationality = 236;
            break;
        case "SRI_LANKA":
        case 33:
            message.nationality = 33;
            break;
        case "SUDAN":
        case 88:
            message.nationality = 88;
            break;
        case "SWEDEN":
        case 237:
            message.nationality = 237;
            break;
        case "SWITZERLAND":
        case 238:
            message.nationality = 238;
            break;
        case "SYRIA":
        case 34:
            message.nationality = 34;
            break;
        case "TAHITI":
        case 170:
            message.nationality = 170;
            break;
        case "TAIWAN":
        case 298:
            message.nationality = 298;
            break;
        case "TAJIKISTAN":
        case 41:
            message.nationality = 41;
            break;
        case "THAILAND":
        case 36:
            message.nationality = 36;
            break;
        case "THE_COMOROS":
        case 54:
            message.nationality = 54;
            break;
        case "TOGO":
        case 91:
            message.nationality = 91;
            break;
        case "TRINIDAD_AND_TOBAGO":
        case 133:
            message.nationality = 133;
            break;
        case "TUNISIA":
        case 92:
            message.nationality = 92;
            break;
        case "TURKEY":
        case 190:
            message.nationality = 190;
            break;
        case "TURKMENISTAN":
        case 42:
            message.nationality = 42;
            break;
        case "TURKS_AND_CAICOS_IS":
        case 134:
            message.nationality = 134;
            break;
        case "UAE":
        case 37:
            message.nationality = 37;
            break;
        case "UGANDA":
        case 93:
            message.nationality = 93;
            break;
        case "UKRAINE":
        case 239:
            message.nationality = 239;
            break;
        case "UNITED_STATES":
        case 135:
            message.nationality = 135;
            break;
        case "URUGUAY":
        case 152:
            message.nationality = 152;
            break;
        case "UZBEKISTAN":
        case 240:
            message.nationality = 240;
            break;
        case "VENEZUELA":
        case 153:
            message.nationality = 153;
            break;
        case "VIETNAM":
        case 38:
            message.nationality = 38;
            break;
        case "WALES":
        case 241:
            message.nationality = 241;
            break;
        case "ZAMBIA":
        case 94:
            message.nationality = 94;
            break;
        case "ZIMBABWE":
        case 95:
            message.nationality = 95;
            break;
        }
        switch (object.preferredFoot) {
        case "RIGHT":
        case 0:
            message.preferredFoot = 0;
            break;
        case "LEFT":
        case 1:
            message.preferredFoot = 1;
            break;
        }
        if (object.physique != null) {
            if (typeof object.physique !== "object")
                throw TypeError(".Player.physique: object expected");
            message.physique = $root.Physique.fromObject(object.physique);
        }
        if (object.abilities != null) {
            if (typeof object.abilities !== "object")
                throw TypeError(".Player.abilities: object expected");
            message.abilities = $root.PlayerAbilities.fromObject(object.abilities);
        }
        if (object.motion != null) {
            if (typeof object.motion !== "object")
                throw TypeError(".Player.motion: object expected");
            message.motion = $root.PlayerMotion.fromObject(object.motion);
        }
        if (object.isEdited != null)
            message.isEdited = Boolean(object.isEdited);
        if (object.isBaseCopy != null)
            message.isBaseCopy = Boolean(object.isBaseCopy);
        if (object.edited != null) {
            if (typeof object.edited !== "object")
                throw TypeError(".Player.edited: object expected");
            message.edited = $root.Edits.fromObject(object.edited);
        }
        switch (object.registeredPosition) {
        case "AMF":
        case 8:
            message.registeredPosition = 8;
            break;
        case "CB":
        case 1:
            message.registeredPosition = 1;
            break;
        case "CF":
        case 12:
            message.registeredPosition = 12;
            break;
        case "CMF":
        case 5:
            message.registeredPosition = 5;
            break;
        case "DMF":
        case 4:
            message.registeredPosition = 4;
            break;
        case "GK":
        case 0:
            message.registeredPosition = 0;
            break;
        case "LB":
        case 2:
            message.registeredPosition = 2;
            break;
        case "LMF":
        case 6:
            message.registeredPosition = 6;
            break;
        case "LWF":
        case 9:
            message.registeredPosition = 9;
            break;
        case "RB":
        case 3:
            message.registeredPosition = 3;
            break;
        case "RMF":
        case 7:
            message.registeredPosition = 7;
            break;
        case "RWF":
        case 10:
            message.registeredPosition = 10;
            break;
        case "SS":
        case 11:
            message.registeredPosition = 11;
            break;
        }
        switch (object.playingStyle) {
        case "ANCHOR_MAN":
        case 8:
            message.playingStyle = 8;
            break;
        case "BOX_TO_BOX":
        case 7:
            message.playingStyle = 7;
            break;
        case "BUILD_UP":
        case 15:
            message.playingStyle = 15;
            break;
        case "CLASSIC_NO_10":
        case 5:
            message.playingStyle = 5;
            break;
        case "CREATIVE_PLAYMAKER":
        case 14:
            message.playingStyle = 14;
            break;
        case "DEFENSIVE_FULLBACK":
        case 12:
            message.playingStyle = 12;
            break;
        case "DEFENSIVE_GOALKEEPER":
        case 18:
            message.playingStyle = 18;
            break;
        case "DUMMY_RUNNER":
        case 2:
            message.playingStyle = 2;
            break;
        case "EXTRA_FRONTMAN":
        case 10:
            message.playingStyle = 10;
            break;
        case "FOX_IN_THE_BOX":
        case 3:
            message.playingStyle = 3;
            break;
        case "GOAL_POACHER":
        case 1:
            message.playingStyle = 1;
            break;
        case "HOLE_PLAYER":
        case 6:
            message.playingStyle = 6;
            break;
        case "N_A":
        case 16:
            message.playingStyle = 16;
            break;
        case "NONE":
        case 0:
            message.playingStyle = 0;
            break;
        case "OFFENSIVE_FULLBACK":
        case 11:
            message.playingStyle = 11;
            break;
        case "OFFENSIVE_GOALKEEPER":
        case 17:
            message.playingStyle = 17;
            break;
        case "PROLIFIC_WINGER":
        case 4:
            message.playingStyle = 4;
            break;
        case "TARGET_MAN":
        case 13:
            message.playingStyle = 13;
            break;
        case "THE_DESTROYER":
        case 9:
            message.playingStyle = 9;
            break;
        }
        if (object.playablePositions) {
            if (!Array.isArray(object.playablePositions))
                throw TypeError(".Player.playablePositions: array expected");
            message.playablePositions = [];
            for (var i = 0; i < object.playablePositions.length; ++i)
                switch (object.playablePositions[i]) {
                default:
                case "AMF":
                case 8:
                    message.playablePositions[i] = 8;
                    break;
                case "CB":
                case 1:
                    message.playablePositions[i] = 1;
                    break;
                case "CF":
                case 12:
                    message.playablePositions[i] = 12;
                    break;
                case "CMF":
                case 5:
                    message.playablePositions[i] = 5;
                    break;
                case "DMF":
                case 4:
                    message.playablePositions[i] = 4;
                    break;
                case "GK":
                case 0:
                    message.playablePositions[i] = 0;
                    break;
                case "LB":
                case 2:
                    message.playablePositions[i] = 2;
                    break;
                case "LMF":
                case 6:
                    message.playablePositions[i] = 6;
                    break;
                case "LWF":
                case 9:
                    message.playablePositions[i] = 9;
                    break;
                case "RB":
                case 3:
                    message.playablePositions[i] = 3;
                    break;
                case "RMF":
                case 7:
                    message.playablePositions[i] = 7;
                    break;
                case "RWF":
                case 10:
                    message.playablePositions[i] = 10;
                    break;
                case "SS":
                case 11:
                    message.playablePositions[i] = 11;
                    break;
                }
        }
        if (object.comPlayingStyles) {
            if (!Array.isArray(object.comPlayingStyles))
                throw TypeError(".Player.comPlayingStyles: array expected");
            message.comPlayingStyles = [];
            for (var i = 0; i < object.comPlayingStyles.length; ++i)
                switch (object.comPlayingStyles[i]) {
                default:
                case "EARLY_CROSS":
                case 5:
                    message.comPlayingStyles[i] = 5;
                    break;
                case "INCISIVE_RUN":
                case 3:
                    message.comPlayingStyles[i] = 3;
                    break;
                case "LONG_BALL_EXPERT":
                case 4:
                    message.comPlayingStyles[i] = 4;
                    break;
                case "LONG_RANGER":
                case 6:
                    message.comPlayingStyles[i] = 6;
                    break;
                case "MAZING_RUN":
                case 1:
                    message.comPlayingStyles[i] = 1;
                    break;
                case "SPEEDING_BULLET":
                case 2:
                    message.comPlayingStyles[i] = 2;
                    break;
                case "TRICKSTER":
                case 0:
                    message.comPlayingStyles[i] = 0;
                    break;
                }
        }
        if (object.playerSkills) {
            if (!Array.isArray(object.playerSkills))
                throw TypeError(".Player.playerSkills: array expected");
            message.playerSkills = [];
            for (var i = 0; i < object.playerSkills.length; ++i)
                switch (object.playerSkills[i]) {
                default:
                case "ACROBATIC_CLEAR":
                case 24:
                    message.playerSkills[i] = 24;
                    break;
                case "ACROBATIC_FINISHING":
                case 9:
                    message.playerSkills[i] = 9;
                    break;
                case "CAPTAINCY":
                case 25:
                    message.playerSkills[i] = 25;
                    break;
                case "CUT_BEHIND_TURN":
                case 4:
                    message.playerSkills[i] = 4;
                    break;
                case "FIGHTING_SPIRIT":
                case 27:
                    message.playerSkills[i] = 27;
                    break;
                case "FIRST_TIME_SHOT":
                case 11:
                    message.playerSkills[i] = 11;
                    break;
                case "FLIP_FLAP":
                case 1:
                    message.playerSkills[i] = 1;
                    break;
                case "GK_LONG_THROW":
                case 20:
                    message.playerSkills[i] = 20;
                    break;
                case "HEADING":
                case 6:
                    message.playerSkills[i] = 6;
                    break;
                case "HEEL_TRICK":
                case 10:
                    message.playerSkills[i] = 10;
                    break;
                case "KNUCKLE_SHOT":
                case 8:
                    message.playerSkills[i] = 8;
                    break;
                case "LONG_RANGE_DRIVE":
                case 7:
                    message.playerSkills[i] = 7;
                    break;
                case "LONG_THROW":
                case 19:
                    message.playerSkills[i] = 19;
                    break;
                case "LOW_LOFTED_PASS":
                case 17:
                    message.playerSkills[i] = 17;
                    break;
                case "LOW_PUNT_TRAJECTORY":
                case 18:
                    message.playerSkills[i] = 18;
                    break;
                case "MALICIA":
                case 21:
                    message.playerSkills[i] = 21;
                    break;
                case "MAN_MARKING":
                case 22:
                    message.playerSkills[i] = 22;
                    break;
                case "MARSEILLE_TURN":
                case 2:
                    message.playerSkills[i] = 2;
                    break;
                case "ONE_TOUCH_PASS":
                case 12:
                    message.playerSkills[i] = 12;
                    break;
                case "OUTSIDE_CURLER":
                case 15:
                    message.playerSkills[i] = 15;
                    break;
                case "PINPOINT_CROSSING":
                case 14:
                    message.playerSkills[i] = 14;
                    break;
                case "RABONA":
                case 16:
                    message.playerSkills[i] = 16;
                    break;
                case "SCISSORS_FEINT":
                case 0:
                    message.playerSkills[i] = 0;
                    break;
                case "SCOTCH_MOVE":
                case 5:
                    message.playerSkills[i] = 5;
                    break;
                case "SOMBRERO":
                case 3:
                    message.playerSkills[i] = 3;
                    break;
                case "SUPER_SUB":
                case 26:
                    message.playerSkills[i] = 26;
                    break;
                case "TRACK_BACK":
                case 23:
                    message.playerSkills[i] = 23;
                    break;
                case "WEIGHTED_PASS":
                case 13:
                    message.playerSkills[i] = 13;
                    break;
                }
        }
        if (object.appearance != null) {
            if (typeof object.appearance !== "object")
                throw TypeError(".Player.appearance: object expected");
            message.appearance = $root.PlayerAppearance.fromObject(object.appearance);
        }
        if (object.unknowns != null) {
            if (typeof object.unknowns !== "object")
                throw TypeError(".Player.unknowns: object expected");
            message.unknowns = $root.UnknownOptions.fromObject(object.unknowns);
        }
        if (object.indexState != null)
            message.indexState = String(object.indexState);
        if (object.indexError != null)
            message.indexError = String(object.indexError);
        return message;
    };

    /**
     * Creates a plain object from a Player message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Player
     * @static
     * @param {Player} message Player
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Player.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.playablePositions = [];
            object.comPlayingStyles = [];
            object.playerSkills = [];
        }
        if (options.defaults) {
            object.id = "";
            object.commentaryId = "";
            object.name = "";
            object.kitName = "";
            object.age = 0;
            object.nationality = options.enums === String ? "AFGHANISTAN" : 1;
            object.preferredFoot = options.enums === String ? "RIGHT" : 0;
            object.physique = null;
            object.abilities = null;
            object.motion = null;
            object.isEdited = false;
            object.isBaseCopy = false;
            object.edited = null;
            object.registeredPosition = options.enums === String ? "AMF" : 8;
            object.playingStyle = options.enums === String ? "ANCHOR_MAN" : 8;
            object.appearance = null;
            object.unknowns = null;
            object.indexState = "";
            object.indexError = "";
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.commentaryId != null && message.hasOwnProperty("commentaryId"))
            object.commentaryId = message.commentaryId;
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.kitName != null && message.hasOwnProperty("kitName"))
            object.kitName = message.kitName;
        if (message.age != null && message.hasOwnProperty("age"))
            object.age = message.age;
        if (message.nationality != null && message.hasOwnProperty("nationality"))
            object.nationality = options.enums === String ? $root.Country[message.nationality] : message.nationality;
        if (message.preferredFoot != null && message.hasOwnProperty("preferredFoot"))
            object.preferredFoot = options.enums === String ? $root.Foot[message.preferredFoot] : message.preferredFoot;
        if (message.physique != null && message.hasOwnProperty("physique"))
            object.physique = $root.Physique.toObject(message.physique, options);
        if (message.abilities != null && message.hasOwnProperty("abilities"))
            object.abilities = $root.PlayerAbilities.toObject(message.abilities, options);
        if (message.motion != null && message.hasOwnProperty("motion"))
            object.motion = $root.PlayerMotion.toObject(message.motion, options);
        if (message.isEdited != null && message.hasOwnProperty("isEdited"))
            object.isEdited = message.isEdited;
        if (message.isBaseCopy != null && message.hasOwnProperty("isBaseCopy"))
            object.isBaseCopy = message.isBaseCopy;
        if (message.edited != null && message.hasOwnProperty("edited"))
            object.edited = $root.Edits.toObject(message.edited, options);
        if (message.registeredPosition != null && message.hasOwnProperty("registeredPosition"))
            object.registeredPosition = options.enums === String ? $root.Position[message.registeredPosition] : message.registeredPosition;
        if (message.playingStyle != null && message.hasOwnProperty("playingStyle"))
            object.playingStyle = options.enums === String ? $root.PlayingStyle[message.playingStyle] : message.playingStyle;
        if (message.playablePositions && message.playablePositions.length) {
            object.playablePositions = [];
            for (var j = 0; j < message.playablePositions.length; ++j)
                object.playablePositions[j] = options.enums === String ? $root.Position[message.playablePositions[j]] : message.playablePositions[j];
        }
        if (message.comPlayingStyles && message.comPlayingStyles.length) {
            object.comPlayingStyles = [];
            for (var j = 0; j < message.comPlayingStyles.length; ++j)
                object.comPlayingStyles[j] = options.enums === String ? $root.ComPlayingStyle[message.comPlayingStyles[j]] : message.comPlayingStyles[j];
        }
        if (message.playerSkills && message.playerSkills.length) {
            object.playerSkills = [];
            for (var j = 0; j < message.playerSkills.length; ++j)
                object.playerSkills[j] = options.enums === String ? $root.Skill[message.playerSkills[j]] : message.playerSkills[j];
        }
        if (message.appearance != null && message.hasOwnProperty("appearance"))
            object.appearance = $root.PlayerAppearance.toObject(message.appearance, options);
        if (message.unknowns != null && message.hasOwnProperty("unknowns"))
            object.unknowns = $root.UnknownOptions.toObject(message.unknowns, options);
        if (message.indexState != null && message.hasOwnProperty("indexState"))
            object.indexState = message.indexState;
        if (message.indexError != null && message.hasOwnProperty("indexError"))
            object.indexError = message.indexError;
        return object;
    };

    /**
     * Converts this Player to JSON.
     * @function toJSON
     * @memberof Player
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Player.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Player;
})();

$root.Physique = (function() {

    /**
     * Properties of a Physique.
     * @exports IPhysique
     * @interface IPhysique
     * @property {number} height Physique height
     * @property {number} weight Physique weight
     * @property {number|null} [neckLength] Physique neckLength
     * @property {number|null} [neckSize] Physique neckSize
     * @property {number|null} [shoulderHeight] Physique shoulderHeight
     * @property {number|null} [shoulderWidth] Physique shoulderWidth
     * @property {number|null} [chestSize] Physique chestSize
     * @property {number|null} [waistSize] Physique waistSize
     * @property {number|null} [armSize] Physique armSize
     * @property {number|null} [thighSize] Physique thighSize
     * @property {number|null} [calfSize] Physique calfSize
     * @property {number|null} [legLength] Physique legLength
     * @property {number|null} [armLength] Physique armLength
     */

    /**
     * Constructs a new Physique.
     * @exports Physique
     * @classdesc Represents a Physique.
     * @implements IPhysique
     * @constructor
     * @param {IPhysique=} [properties] Properties to set
     */
    function Physique(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Physique height.
     * @member {number} height
     * @memberof Physique
     * @instance
     */
    Physique.prototype.height = 0;

    /**
     * Physique weight.
     * @member {number} weight
     * @memberof Physique
     * @instance
     */
    Physique.prototype.weight = 0;

    /**
     * Physique neckLength.
     * @member {number} neckLength
     * @memberof Physique
     * @instance
     */
    Physique.prototype.neckLength = 0;

    /**
     * Physique neckSize.
     * @member {number} neckSize
     * @memberof Physique
     * @instance
     */
    Physique.prototype.neckSize = 0;

    /**
     * Physique shoulderHeight.
     * @member {number} shoulderHeight
     * @memberof Physique
     * @instance
     */
    Physique.prototype.shoulderHeight = 0;

    /**
     * Physique shoulderWidth.
     * @member {number} shoulderWidth
     * @memberof Physique
     * @instance
     */
    Physique.prototype.shoulderWidth = 0;

    /**
     * Physique chestSize.
     * @member {number} chestSize
     * @memberof Physique
     * @instance
     */
    Physique.prototype.chestSize = 0;

    /**
     * Physique waistSize.
     * @member {number} waistSize
     * @memberof Physique
     * @instance
     */
    Physique.prototype.waistSize = 0;

    /**
     * Physique armSize.
     * @member {number} armSize
     * @memberof Physique
     * @instance
     */
    Physique.prototype.armSize = 0;

    /**
     * Physique thighSize.
     * @member {number} thighSize
     * @memberof Physique
     * @instance
     */
    Physique.prototype.thighSize = 0;

    /**
     * Physique calfSize.
     * @member {number} calfSize
     * @memberof Physique
     * @instance
     */
    Physique.prototype.calfSize = 0;

    /**
     * Physique legLength.
     * @member {number} legLength
     * @memberof Physique
     * @instance
     */
    Physique.prototype.legLength = 0;

    /**
     * Physique armLength.
     * @member {number} armLength
     * @memberof Physique
     * @instance
     */
    Physique.prototype.armLength = 0;

    /**
     * Creates a new Physique instance using the specified properties.
     * @function create
     * @memberof Physique
     * @static
     * @param {IPhysique=} [properties] Properties to set
     * @returns {Physique} Physique instance
     */
    Physique.create = function create(properties) {
        return new Physique(properties);
    };

    /**
     * Encodes the specified Physique message. Does not implicitly {@link Physique.verify|verify} messages.
     * @function encode
     * @memberof Physique
     * @static
     * @param {IPhysique} message Physique message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Physique.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.height);
        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.weight);
        if (message.neckLength != null && message.hasOwnProperty("neckLength"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.neckLength);
        if (message.neckSize != null && message.hasOwnProperty("neckSize"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.neckSize);
        if (message.shoulderHeight != null && message.hasOwnProperty("shoulderHeight"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.shoulderHeight);
        if (message.shoulderWidth != null && message.hasOwnProperty("shoulderWidth"))
            writer.uint32(/* id 6, wireType 0 =*/48).int32(message.shoulderWidth);
        if (message.chestSize != null && message.hasOwnProperty("chestSize"))
            writer.uint32(/* id 7, wireType 0 =*/56).int32(message.chestSize);
        if (message.waistSize != null && message.hasOwnProperty("waistSize"))
            writer.uint32(/* id 8, wireType 0 =*/64).int32(message.waistSize);
        if (message.armSize != null && message.hasOwnProperty("armSize"))
            writer.uint32(/* id 9, wireType 0 =*/72).int32(message.armSize);
        if (message.thighSize != null && message.hasOwnProperty("thighSize"))
            writer.uint32(/* id 10, wireType 0 =*/80).int32(message.thighSize);
        if (message.calfSize != null && message.hasOwnProperty("calfSize"))
            writer.uint32(/* id 11, wireType 0 =*/88).int32(message.calfSize);
        if (message.legLength != null && message.hasOwnProperty("legLength"))
            writer.uint32(/* id 12, wireType 0 =*/96).int32(message.legLength);
        if (message.armLength != null && message.hasOwnProperty("armLength"))
            writer.uint32(/* id 13, wireType 0 =*/104).int32(message.armLength);
        return writer;
    };

    /**
     * Encodes the specified Physique message, length delimited. Does not implicitly {@link Physique.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Physique
     * @static
     * @param {IPhysique} message Physique message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Physique.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Physique message from the specified reader or buffer.
     * @function decode
     * @memberof Physique
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Physique} Physique
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Physique.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Physique();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.height = reader.uint32();
                break;
            case 2:
                message.weight = reader.uint32();
                break;
            case 3:
                message.neckLength = reader.int32();
                break;
            case 4:
                message.neckSize = reader.int32();
                break;
            case 5:
                message.shoulderHeight = reader.int32();
                break;
            case 6:
                message.shoulderWidth = reader.int32();
                break;
            case 7:
                message.chestSize = reader.int32();
                break;
            case 8:
                message.waistSize = reader.int32();
                break;
            case 9:
                message.armSize = reader.int32();
                break;
            case 10:
                message.thighSize = reader.int32();
                break;
            case 11:
                message.calfSize = reader.int32();
                break;
            case 12:
                message.legLength = reader.int32();
                break;
            case 13:
                message.armLength = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("height"))
            throw $util.ProtocolError("missing required 'height'", { instance: message });
        if (!message.hasOwnProperty("weight"))
            throw $util.ProtocolError("missing required 'weight'", { instance: message });
        return message;
    };

    /**
     * Decodes a Physique message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Physique
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Physique} Physique
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Physique.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Physique message.
     * @function verify
     * @memberof Physique
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Physique.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.height))
            return "height: integer expected";
        if (!$util.isInteger(message.weight))
            return "weight: integer expected";
        if (message.neckLength != null && message.hasOwnProperty("neckLength"))
            if (!$util.isInteger(message.neckLength))
                return "neckLength: integer expected";
        if (message.neckSize != null && message.hasOwnProperty("neckSize"))
            if (!$util.isInteger(message.neckSize))
                return "neckSize: integer expected";
        if (message.shoulderHeight != null && message.hasOwnProperty("shoulderHeight"))
            if (!$util.isInteger(message.shoulderHeight))
                return "shoulderHeight: integer expected";
        if (message.shoulderWidth != null && message.hasOwnProperty("shoulderWidth"))
            if (!$util.isInteger(message.shoulderWidth))
                return "shoulderWidth: integer expected";
        if (message.chestSize != null && message.hasOwnProperty("chestSize"))
            if (!$util.isInteger(message.chestSize))
                return "chestSize: integer expected";
        if (message.waistSize != null && message.hasOwnProperty("waistSize"))
            if (!$util.isInteger(message.waistSize))
                return "waistSize: integer expected";
        if (message.armSize != null && message.hasOwnProperty("armSize"))
            if (!$util.isInteger(message.armSize))
                return "armSize: integer expected";
        if (message.thighSize != null && message.hasOwnProperty("thighSize"))
            if (!$util.isInteger(message.thighSize))
                return "thighSize: integer expected";
        if (message.calfSize != null && message.hasOwnProperty("calfSize"))
            if (!$util.isInteger(message.calfSize))
                return "calfSize: integer expected";
        if (message.legLength != null && message.hasOwnProperty("legLength"))
            if (!$util.isInteger(message.legLength))
                return "legLength: integer expected";
        if (message.armLength != null && message.hasOwnProperty("armLength"))
            if (!$util.isInteger(message.armLength))
                return "armLength: integer expected";
        return null;
    };

    /**
     * Creates a Physique message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Physique
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Physique} Physique
     */
    Physique.fromObject = function fromObject(object) {
        if (object instanceof $root.Physique)
            return object;
        var message = new $root.Physique();
        if (object.height != null)
            message.height = object.height >>> 0;
        if (object.weight != null)
            message.weight = object.weight >>> 0;
        if (object.neckLength != null)
            message.neckLength = object.neckLength | 0;
        if (object.neckSize != null)
            message.neckSize = object.neckSize | 0;
        if (object.shoulderHeight != null)
            message.shoulderHeight = object.shoulderHeight | 0;
        if (object.shoulderWidth != null)
            message.shoulderWidth = object.shoulderWidth | 0;
        if (object.chestSize != null)
            message.chestSize = object.chestSize | 0;
        if (object.waistSize != null)
            message.waistSize = object.waistSize | 0;
        if (object.armSize != null)
            message.armSize = object.armSize | 0;
        if (object.thighSize != null)
            message.thighSize = object.thighSize | 0;
        if (object.calfSize != null)
            message.calfSize = object.calfSize | 0;
        if (object.legLength != null)
            message.legLength = object.legLength | 0;
        if (object.armLength != null)
            message.armLength = object.armLength | 0;
        return message;
    };

    /**
     * Creates a plain object from a Physique message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Physique
     * @static
     * @param {Physique} message Physique
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Physique.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.height = 0;
            object.weight = 0;
            object.neckLength = 0;
            object.neckSize = 0;
            object.shoulderHeight = 0;
            object.shoulderWidth = 0;
            object.chestSize = 0;
            object.waistSize = 0;
            object.armSize = 0;
            object.thighSize = 0;
            object.calfSize = 0;
            object.legLength = 0;
            object.armLength = 0;
        }
        if (message.height != null && message.hasOwnProperty("height"))
            object.height = message.height;
        if (message.weight != null && message.hasOwnProperty("weight"))
            object.weight = message.weight;
        if (message.neckLength != null && message.hasOwnProperty("neckLength"))
            object.neckLength = message.neckLength;
        if (message.neckSize != null && message.hasOwnProperty("neckSize"))
            object.neckSize = message.neckSize;
        if (message.shoulderHeight != null && message.hasOwnProperty("shoulderHeight"))
            object.shoulderHeight = message.shoulderHeight;
        if (message.shoulderWidth != null && message.hasOwnProperty("shoulderWidth"))
            object.shoulderWidth = message.shoulderWidth;
        if (message.chestSize != null && message.hasOwnProperty("chestSize"))
            object.chestSize = message.chestSize;
        if (message.waistSize != null && message.hasOwnProperty("waistSize"))
            object.waistSize = message.waistSize;
        if (message.armSize != null && message.hasOwnProperty("armSize"))
            object.armSize = message.armSize;
        if (message.thighSize != null && message.hasOwnProperty("thighSize"))
            object.thighSize = message.thighSize;
        if (message.calfSize != null && message.hasOwnProperty("calfSize"))
            object.calfSize = message.calfSize;
        if (message.legLength != null && message.hasOwnProperty("legLength"))
            object.legLength = message.legLength;
        if (message.armLength != null && message.hasOwnProperty("armLength"))
            object.armLength = message.armLength;
        return object;
    };

    /**
     * Converts this Physique to JSON.
     * @function toJSON
     * @memberof Physique
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Physique.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Physique;
})();

$root.PlayerAbilities = (function() {

    /**
     * Properties of a PlayerAbilities.
     * @exports IPlayerAbilities
     * @interface IPlayerAbilities
     * @property {number} attackingProwess PlayerAbilities attackingProwess
     * @property {number} ballControl PlayerAbilities ballControl
     * @property {number} ballWinning PlayerAbilities ballWinning
     * @property {number} bodyControl PlayerAbilities bodyControl
     * @property {number} catching PlayerAbilities catching
     * @property {number} clearing PlayerAbilities clearing
     * @property {number} coverage PlayerAbilities coverage
     * @property {number} defensiveProwess PlayerAbilities defensiveProwess
     * @property {number} dribbling PlayerAbilities dribbling
     * @property {number} explosivePower PlayerAbilities explosivePower
     * @property {number} finishing PlayerAbilities finishing
     * @property {number} goalkeeping PlayerAbilities goalkeeping
     * @property {number} header PlayerAbilities header
     * @property {number} injuryResistance PlayerAbilities injuryResistance
     * @property {number} jump PlayerAbilities jump
     * @property {number} kickingPower PlayerAbilities kickingPower
     * @property {number} loftedPass PlayerAbilities loftedPass
     * @property {number} lowPass PlayerAbilities lowPass
     * @property {number} physicalContact PlayerAbilities physicalContact
     * @property {number} placeKicking PlayerAbilities placeKicking
     * @property {number} reflexes PlayerAbilities reflexes
     * @property {number} speed PlayerAbilities speed
     * @property {number} stamina PlayerAbilities stamina
     * @property {number} swerve PlayerAbilities swerve
     * @property {number} weakFootAccuracy PlayerAbilities weakFootAccuracy
     * @property {number} weakFootUsage PlayerAbilities weakFootUsage
     * @property {number} form PlayerAbilities form
     */

    /**
     * Constructs a new PlayerAbilities.
     * @exports PlayerAbilities
     * @classdesc Represents a PlayerAbilities.
     * @implements IPlayerAbilities
     * @constructor
     * @param {IPlayerAbilities=} [properties] Properties to set
     */
    function PlayerAbilities(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PlayerAbilities attackingProwess.
     * @member {number} attackingProwess
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.attackingProwess = 0;

    /**
     * PlayerAbilities ballControl.
     * @member {number} ballControl
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.ballControl = 0;

    /**
     * PlayerAbilities ballWinning.
     * @member {number} ballWinning
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.ballWinning = 0;

    /**
     * PlayerAbilities bodyControl.
     * @member {number} bodyControl
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.bodyControl = 0;

    /**
     * PlayerAbilities catching.
     * @member {number} catching
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.catching = 0;

    /**
     * PlayerAbilities clearing.
     * @member {number} clearing
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.clearing = 0;

    /**
     * PlayerAbilities coverage.
     * @member {number} coverage
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.coverage = 0;

    /**
     * PlayerAbilities defensiveProwess.
     * @member {number} defensiveProwess
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.defensiveProwess = 0;

    /**
     * PlayerAbilities dribbling.
     * @member {number} dribbling
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.dribbling = 0;

    /**
     * PlayerAbilities explosivePower.
     * @member {number} explosivePower
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.explosivePower = 0;

    /**
     * PlayerAbilities finishing.
     * @member {number} finishing
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.finishing = 0;

    /**
     * PlayerAbilities goalkeeping.
     * @member {number} goalkeeping
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.goalkeeping = 0;

    /**
     * PlayerAbilities header.
     * @member {number} header
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.header = 0;

    /**
     * PlayerAbilities injuryResistance.
     * @member {number} injuryResistance
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.injuryResistance = 0;

    /**
     * PlayerAbilities jump.
     * @member {number} jump
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.jump = 0;

    /**
     * PlayerAbilities kickingPower.
     * @member {number} kickingPower
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.kickingPower = 0;

    /**
     * PlayerAbilities loftedPass.
     * @member {number} loftedPass
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.loftedPass = 0;

    /**
     * PlayerAbilities lowPass.
     * @member {number} lowPass
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.lowPass = 0;

    /**
     * PlayerAbilities physicalContact.
     * @member {number} physicalContact
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.physicalContact = 0;

    /**
     * PlayerAbilities placeKicking.
     * @member {number} placeKicking
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.placeKicking = 0;

    /**
     * PlayerAbilities reflexes.
     * @member {number} reflexes
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.reflexes = 0;

    /**
     * PlayerAbilities speed.
     * @member {number} speed
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.speed = 0;

    /**
     * PlayerAbilities stamina.
     * @member {number} stamina
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.stamina = 0;

    /**
     * PlayerAbilities swerve.
     * @member {number} swerve
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.swerve = 0;

    /**
     * PlayerAbilities weakFootAccuracy.
     * @member {number} weakFootAccuracy
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.weakFootAccuracy = 0;

    /**
     * PlayerAbilities weakFootUsage.
     * @member {number} weakFootUsage
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.weakFootUsage = 0;

    /**
     * PlayerAbilities form.
     * @member {number} form
     * @memberof PlayerAbilities
     * @instance
     */
    PlayerAbilities.prototype.form = 0;

    /**
     * Creates a new PlayerAbilities instance using the specified properties.
     * @function create
     * @memberof PlayerAbilities
     * @static
     * @param {IPlayerAbilities=} [properties] Properties to set
     * @returns {PlayerAbilities} PlayerAbilities instance
     */
    PlayerAbilities.create = function create(properties) {
        return new PlayerAbilities(properties);
    };

    /**
     * Encodes the specified PlayerAbilities message. Does not implicitly {@link PlayerAbilities.verify|verify} messages.
     * @function encode
     * @memberof PlayerAbilities
     * @static
     * @param {IPlayerAbilities} message PlayerAbilities message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayerAbilities.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.attackingProwess);
        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.ballControl);
        writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.ballWinning);
        writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.bodyControl);
        writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.catching);
        writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.clearing);
        writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.coverage);
        writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.defensiveProwess);
        writer.uint32(/* id 9, wireType 0 =*/72).uint32(message.dribbling);
        writer.uint32(/* id 10, wireType 0 =*/80).uint32(message.explosivePower);
        writer.uint32(/* id 11, wireType 0 =*/88).uint32(message.finishing);
        writer.uint32(/* id 12, wireType 0 =*/96).uint32(message.goalkeeping);
        writer.uint32(/* id 13, wireType 0 =*/104).uint32(message.header);
        writer.uint32(/* id 14, wireType 0 =*/112).uint32(message.injuryResistance);
        writer.uint32(/* id 15, wireType 0 =*/120).uint32(message.jump);
        writer.uint32(/* id 16, wireType 0 =*/128).uint32(message.kickingPower);
        writer.uint32(/* id 17, wireType 0 =*/136).uint32(message.loftedPass);
        writer.uint32(/* id 18, wireType 0 =*/144).uint32(message.physicalContact);
        writer.uint32(/* id 19, wireType 0 =*/152).uint32(message.placeKicking);
        writer.uint32(/* id 20, wireType 0 =*/160).uint32(message.reflexes);
        writer.uint32(/* id 21, wireType 0 =*/168).uint32(message.speed);
        writer.uint32(/* id 22, wireType 0 =*/176).uint32(message.stamina);
        writer.uint32(/* id 23, wireType 0 =*/184).uint32(message.swerve);
        writer.uint32(/* id 24, wireType 0 =*/192).uint32(message.weakFootAccuracy);
        writer.uint32(/* id 25, wireType 0 =*/200).uint32(message.weakFootUsage);
        writer.uint32(/* id 26, wireType 0 =*/208).uint32(message.lowPass);
        writer.uint32(/* id 27, wireType 0 =*/216).uint32(message.form);
        return writer;
    };

    /**
     * Encodes the specified PlayerAbilities message, length delimited. Does not implicitly {@link PlayerAbilities.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PlayerAbilities
     * @static
     * @param {IPlayerAbilities} message PlayerAbilities message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayerAbilities.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PlayerAbilities message from the specified reader or buffer.
     * @function decode
     * @memberof PlayerAbilities
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PlayerAbilities} PlayerAbilities
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayerAbilities.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PlayerAbilities();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.attackingProwess = reader.uint32();
                break;
            case 2:
                message.ballControl = reader.uint32();
                break;
            case 3:
                message.ballWinning = reader.uint32();
                break;
            case 4:
                message.bodyControl = reader.uint32();
                break;
            case 5:
                message.catching = reader.uint32();
                break;
            case 6:
                message.clearing = reader.uint32();
                break;
            case 7:
                message.coverage = reader.uint32();
                break;
            case 8:
                message.defensiveProwess = reader.uint32();
                break;
            case 9:
                message.dribbling = reader.uint32();
                break;
            case 10:
                message.explosivePower = reader.uint32();
                break;
            case 11:
                message.finishing = reader.uint32();
                break;
            case 12:
                message.goalkeeping = reader.uint32();
                break;
            case 13:
                message.header = reader.uint32();
                break;
            case 14:
                message.injuryResistance = reader.uint32();
                break;
            case 15:
                message.jump = reader.uint32();
                break;
            case 16:
                message.kickingPower = reader.uint32();
                break;
            case 17:
                message.loftedPass = reader.uint32();
                break;
            case 26:
                message.lowPass = reader.uint32();
                break;
            case 18:
                message.physicalContact = reader.uint32();
                break;
            case 19:
                message.placeKicking = reader.uint32();
                break;
            case 20:
                message.reflexes = reader.uint32();
                break;
            case 21:
                message.speed = reader.uint32();
                break;
            case 22:
                message.stamina = reader.uint32();
                break;
            case 23:
                message.swerve = reader.uint32();
                break;
            case 24:
                message.weakFootAccuracy = reader.uint32();
                break;
            case 25:
                message.weakFootUsage = reader.uint32();
                break;
            case 27:
                message.form = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("attackingProwess"))
            throw $util.ProtocolError("missing required 'attackingProwess'", { instance: message });
        if (!message.hasOwnProperty("ballControl"))
            throw $util.ProtocolError("missing required 'ballControl'", { instance: message });
        if (!message.hasOwnProperty("ballWinning"))
            throw $util.ProtocolError("missing required 'ballWinning'", { instance: message });
        if (!message.hasOwnProperty("bodyControl"))
            throw $util.ProtocolError("missing required 'bodyControl'", { instance: message });
        if (!message.hasOwnProperty("catching"))
            throw $util.ProtocolError("missing required 'catching'", { instance: message });
        if (!message.hasOwnProperty("clearing"))
            throw $util.ProtocolError("missing required 'clearing'", { instance: message });
        if (!message.hasOwnProperty("coverage"))
            throw $util.ProtocolError("missing required 'coverage'", { instance: message });
        if (!message.hasOwnProperty("defensiveProwess"))
            throw $util.ProtocolError("missing required 'defensiveProwess'", { instance: message });
        if (!message.hasOwnProperty("dribbling"))
            throw $util.ProtocolError("missing required 'dribbling'", { instance: message });
        if (!message.hasOwnProperty("explosivePower"))
            throw $util.ProtocolError("missing required 'explosivePower'", { instance: message });
        if (!message.hasOwnProperty("finishing"))
            throw $util.ProtocolError("missing required 'finishing'", { instance: message });
        if (!message.hasOwnProperty("goalkeeping"))
            throw $util.ProtocolError("missing required 'goalkeeping'", { instance: message });
        if (!message.hasOwnProperty("header"))
            throw $util.ProtocolError("missing required 'header'", { instance: message });
        if (!message.hasOwnProperty("injuryResistance"))
            throw $util.ProtocolError("missing required 'injuryResistance'", { instance: message });
        if (!message.hasOwnProperty("jump"))
            throw $util.ProtocolError("missing required 'jump'", { instance: message });
        if (!message.hasOwnProperty("kickingPower"))
            throw $util.ProtocolError("missing required 'kickingPower'", { instance: message });
        if (!message.hasOwnProperty("loftedPass"))
            throw $util.ProtocolError("missing required 'loftedPass'", { instance: message });
        if (!message.hasOwnProperty("lowPass"))
            throw $util.ProtocolError("missing required 'lowPass'", { instance: message });
        if (!message.hasOwnProperty("physicalContact"))
            throw $util.ProtocolError("missing required 'physicalContact'", { instance: message });
        if (!message.hasOwnProperty("placeKicking"))
            throw $util.ProtocolError("missing required 'placeKicking'", { instance: message });
        if (!message.hasOwnProperty("reflexes"))
            throw $util.ProtocolError("missing required 'reflexes'", { instance: message });
        if (!message.hasOwnProperty("speed"))
            throw $util.ProtocolError("missing required 'speed'", { instance: message });
        if (!message.hasOwnProperty("stamina"))
            throw $util.ProtocolError("missing required 'stamina'", { instance: message });
        if (!message.hasOwnProperty("swerve"))
            throw $util.ProtocolError("missing required 'swerve'", { instance: message });
        if (!message.hasOwnProperty("weakFootAccuracy"))
            throw $util.ProtocolError("missing required 'weakFootAccuracy'", { instance: message });
        if (!message.hasOwnProperty("weakFootUsage"))
            throw $util.ProtocolError("missing required 'weakFootUsage'", { instance: message });
        if (!message.hasOwnProperty("form"))
            throw $util.ProtocolError("missing required 'form'", { instance: message });
        return message;
    };

    /**
     * Decodes a PlayerAbilities message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PlayerAbilities
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PlayerAbilities} PlayerAbilities
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayerAbilities.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PlayerAbilities message.
     * @function verify
     * @memberof PlayerAbilities
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PlayerAbilities.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.attackingProwess))
            return "attackingProwess: integer expected";
        if (!$util.isInteger(message.ballControl))
            return "ballControl: integer expected";
        if (!$util.isInteger(message.ballWinning))
            return "ballWinning: integer expected";
        if (!$util.isInteger(message.bodyControl))
            return "bodyControl: integer expected";
        if (!$util.isInteger(message.catching))
            return "catching: integer expected";
        if (!$util.isInteger(message.clearing))
            return "clearing: integer expected";
        if (!$util.isInteger(message.coverage))
            return "coverage: integer expected";
        if (!$util.isInteger(message.defensiveProwess))
            return "defensiveProwess: integer expected";
        if (!$util.isInteger(message.dribbling))
            return "dribbling: integer expected";
        if (!$util.isInteger(message.explosivePower))
            return "explosivePower: integer expected";
        if (!$util.isInteger(message.finishing))
            return "finishing: integer expected";
        if (!$util.isInteger(message.goalkeeping))
            return "goalkeeping: integer expected";
        if (!$util.isInteger(message.header))
            return "header: integer expected";
        if (!$util.isInteger(message.injuryResistance))
            return "injuryResistance: integer expected";
        if (!$util.isInteger(message.jump))
            return "jump: integer expected";
        if (!$util.isInteger(message.kickingPower))
            return "kickingPower: integer expected";
        if (!$util.isInteger(message.loftedPass))
            return "loftedPass: integer expected";
        if (!$util.isInteger(message.lowPass))
            return "lowPass: integer expected";
        if (!$util.isInteger(message.physicalContact))
            return "physicalContact: integer expected";
        if (!$util.isInteger(message.placeKicking))
            return "placeKicking: integer expected";
        if (!$util.isInteger(message.reflexes))
            return "reflexes: integer expected";
        if (!$util.isInteger(message.speed))
            return "speed: integer expected";
        if (!$util.isInteger(message.stamina))
            return "stamina: integer expected";
        if (!$util.isInteger(message.swerve))
            return "swerve: integer expected";
        if (!$util.isInteger(message.weakFootAccuracy))
            return "weakFootAccuracy: integer expected";
        if (!$util.isInteger(message.weakFootUsage))
            return "weakFootUsage: integer expected";
        if (!$util.isInteger(message.form))
            return "form: integer expected";
        return null;
    };

    /**
     * Creates a PlayerAbilities message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PlayerAbilities
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PlayerAbilities} PlayerAbilities
     */
    PlayerAbilities.fromObject = function fromObject(object) {
        if (object instanceof $root.PlayerAbilities)
            return object;
        var message = new $root.PlayerAbilities();
        if (object.attackingProwess != null)
            message.attackingProwess = object.attackingProwess >>> 0;
        if (object.ballControl != null)
            message.ballControl = object.ballControl >>> 0;
        if (object.ballWinning != null)
            message.ballWinning = object.ballWinning >>> 0;
        if (object.bodyControl != null)
            message.bodyControl = object.bodyControl >>> 0;
        if (object.catching != null)
            message.catching = object.catching >>> 0;
        if (object.clearing != null)
            message.clearing = object.clearing >>> 0;
        if (object.coverage != null)
            message.coverage = object.coverage >>> 0;
        if (object.defensiveProwess != null)
            message.defensiveProwess = object.defensiveProwess >>> 0;
        if (object.dribbling != null)
            message.dribbling = object.dribbling >>> 0;
        if (object.explosivePower != null)
            message.explosivePower = object.explosivePower >>> 0;
        if (object.finishing != null)
            message.finishing = object.finishing >>> 0;
        if (object.goalkeeping != null)
            message.goalkeeping = object.goalkeeping >>> 0;
        if (object.header != null)
            message.header = object.header >>> 0;
        if (object.injuryResistance != null)
            message.injuryResistance = object.injuryResistance >>> 0;
        if (object.jump != null)
            message.jump = object.jump >>> 0;
        if (object.kickingPower != null)
            message.kickingPower = object.kickingPower >>> 0;
        if (object.loftedPass != null)
            message.loftedPass = object.loftedPass >>> 0;
        if (object.lowPass != null)
            message.lowPass = object.lowPass >>> 0;
        if (object.physicalContact != null)
            message.physicalContact = object.physicalContact >>> 0;
        if (object.placeKicking != null)
            message.placeKicking = object.placeKicking >>> 0;
        if (object.reflexes != null)
            message.reflexes = object.reflexes >>> 0;
        if (object.speed != null)
            message.speed = object.speed >>> 0;
        if (object.stamina != null)
            message.stamina = object.stamina >>> 0;
        if (object.swerve != null)
            message.swerve = object.swerve >>> 0;
        if (object.weakFootAccuracy != null)
            message.weakFootAccuracy = object.weakFootAccuracy >>> 0;
        if (object.weakFootUsage != null)
            message.weakFootUsage = object.weakFootUsage >>> 0;
        if (object.form != null)
            message.form = object.form >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a PlayerAbilities message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PlayerAbilities
     * @static
     * @param {PlayerAbilities} message PlayerAbilities
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PlayerAbilities.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.attackingProwess = 0;
            object.ballControl = 0;
            object.ballWinning = 0;
            object.bodyControl = 0;
            object.catching = 0;
            object.clearing = 0;
            object.coverage = 0;
            object.defensiveProwess = 0;
            object.dribbling = 0;
            object.explosivePower = 0;
            object.finishing = 0;
            object.goalkeeping = 0;
            object.header = 0;
            object.injuryResistance = 0;
            object.jump = 0;
            object.kickingPower = 0;
            object.loftedPass = 0;
            object.physicalContact = 0;
            object.placeKicking = 0;
            object.reflexes = 0;
            object.speed = 0;
            object.stamina = 0;
            object.swerve = 0;
            object.weakFootAccuracy = 0;
            object.weakFootUsage = 0;
            object.lowPass = 0;
            object.form = 0;
        }
        if (message.attackingProwess != null && message.hasOwnProperty("attackingProwess"))
            object.attackingProwess = message.attackingProwess;
        if (message.ballControl != null && message.hasOwnProperty("ballControl"))
            object.ballControl = message.ballControl;
        if (message.ballWinning != null && message.hasOwnProperty("ballWinning"))
            object.ballWinning = message.ballWinning;
        if (message.bodyControl != null && message.hasOwnProperty("bodyControl"))
            object.bodyControl = message.bodyControl;
        if (message.catching != null && message.hasOwnProperty("catching"))
            object.catching = message.catching;
        if (message.clearing != null && message.hasOwnProperty("clearing"))
            object.clearing = message.clearing;
        if (message.coverage != null && message.hasOwnProperty("coverage"))
            object.coverage = message.coverage;
        if (message.defensiveProwess != null && message.hasOwnProperty("defensiveProwess"))
            object.defensiveProwess = message.defensiveProwess;
        if (message.dribbling != null && message.hasOwnProperty("dribbling"))
            object.dribbling = message.dribbling;
        if (message.explosivePower != null && message.hasOwnProperty("explosivePower"))
            object.explosivePower = message.explosivePower;
        if (message.finishing != null && message.hasOwnProperty("finishing"))
            object.finishing = message.finishing;
        if (message.goalkeeping != null && message.hasOwnProperty("goalkeeping"))
            object.goalkeeping = message.goalkeeping;
        if (message.header != null && message.hasOwnProperty("header"))
            object.header = message.header;
        if (message.injuryResistance != null && message.hasOwnProperty("injuryResistance"))
            object.injuryResistance = message.injuryResistance;
        if (message.jump != null && message.hasOwnProperty("jump"))
            object.jump = message.jump;
        if (message.kickingPower != null && message.hasOwnProperty("kickingPower"))
            object.kickingPower = message.kickingPower;
        if (message.loftedPass != null && message.hasOwnProperty("loftedPass"))
            object.loftedPass = message.loftedPass;
        if (message.physicalContact != null && message.hasOwnProperty("physicalContact"))
            object.physicalContact = message.physicalContact;
        if (message.placeKicking != null && message.hasOwnProperty("placeKicking"))
            object.placeKicking = message.placeKicking;
        if (message.reflexes != null && message.hasOwnProperty("reflexes"))
            object.reflexes = message.reflexes;
        if (message.speed != null && message.hasOwnProperty("speed"))
            object.speed = message.speed;
        if (message.stamina != null && message.hasOwnProperty("stamina"))
            object.stamina = message.stamina;
        if (message.swerve != null && message.hasOwnProperty("swerve"))
            object.swerve = message.swerve;
        if (message.weakFootAccuracy != null && message.hasOwnProperty("weakFootAccuracy"))
            object.weakFootAccuracy = message.weakFootAccuracy;
        if (message.weakFootUsage != null && message.hasOwnProperty("weakFootUsage"))
            object.weakFootUsage = message.weakFootUsage;
        if (message.lowPass != null && message.hasOwnProperty("lowPass"))
            object.lowPass = message.lowPass;
        if (message.form != null && message.hasOwnProperty("form"))
            object.form = message.form;
        return object;
    };

    /**
     * Converts this PlayerAbilities to JSON.
     * @function toJSON
     * @memberof PlayerAbilities
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PlayerAbilities.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PlayerAbilities;
})();

/**
 * Foot enum.
 * @exports Foot
 * @enum {string}
 * @property {number} RIGHT=0 RIGHT value
 * @property {number} LEFT=1 LEFT value
 */
$root.Foot = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "RIGHT"] = 0;
    values[valuesById[1] = "LEFT"] = 1;
    return values;
})();

/**
 * PlayingStyle enum.
 * @exports PlayingStyle
 * @enum {string}
 * @property {number} ANCHOR_MAN=8 ANCHOR_MAN value
 * @property {number} BOX_TO_BOX=7 BOX_TO_BOX value
 * @property {number} BUILD_UP=15 BUILD_UP value
 * @property {number} CLASSIC_NO_10=5 CLASSIC_NO_10 value
 * @property {number} CREATIVE_PLAYMAKER=14 CREATIVE_PLAYMAKER value
 * @property {number} DEFENSIVE_FULLBACK=12 DEFENSIVE_FULLBACK value
 * @property {number} DEFENSIVE_GOALKEEPER=18 DEFENSIVE_GOALKEEPER value
 * @property {number} DUMMY_RUNNER=2 DUMMY_RUNNER value
 * @property {number} EXTRA_FRONTMAN=10 EXTRA_FRONTMAN value
 * @property {number} FOX_IN_THE_BOX=3 FOX_IN_THE_BOX value
 * @property {number} GOAL_POACHER=1 GOAL_POACHER value
 * @property {number} HOLE_PLAYER=6 HOLE_PLAYER value
 * @property {number} N_A=16 N_A value
 * @property {number} NONE=0 NONE value
 * @property {number} OFFENSIVE_FULLBACK=11 OFFENSIVE_FULLBACK value
 * @property {number} OFFENSIVE_GOALKEEPER=17 OFFENSIVE_GOALKEEPER value
 * @property {number} PROLIFIC_WINGER=4 PROLIFIC_WINGER value
 * @property {number} TARGET_MAN=13 TARGET_MAN value
 * @property {number} THE_DESTROYER=9 THE_DESTROYER value
 */
$root.PlayingStyle = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[8] = "ANCHOR_MAN"] = 8;
    values[valuesById[7] = "BOX_TO_BOX"] = 7;
    values[valuesById[15] = "BUILD_UP"] = 15;
    values[valuesById[5] = "CLASSIC_NO_10"] = 5;
    values[valuesById[14] = "CREATIVE_PLAYMAKER"] = 14;
    values[valuesById[12] = "DEFENSIVE_FULLBACK"] = 12;
    values[valuesById[18] = "DEFENSIVE_GOALKEEPER"] = 18;
    values[valuesById[2] = "DUMMY_RUNNER"] = 2;
    values[valuesById[10] = "EXTRA_FRONTMAN"] = 10;
    values[valuesById[3] = "FOX_IN_THE_BOX"] = 3;
    values[valuesById[1] = "GOAL_POACHER"] = 1;
    values[valuesById[6] = "HOLE_PLAYER"] = 6;
    values[valuesById[16] = "N_A"] = 16;
    values[valuesById[0] = "NONE"] = 0;
    values[valuesById[11] = "OFFENSIVE_FULLBACK"] = 11;
    values[valuesById[17] = "OFFENSIVE_GOALKEEPER"] = 17;
    values[valuesById[4] = "PROLIFIC_WINGER"] = 4;
    values[valuesById[13] = "TARGET_MAN"] = 13;
    values[valuesById[9] = "THE_DESTROYER"] = 9;
    return values;
})();

/**
 * ComPlayingStyle enum.
 * @exports ComPlayingStyle
 * @enum {string}
 * @property {number} EARLY_CROSS=5 EARLY_CROSS value
 * @property {number} INCISIVE_RUN=3 INCISIVE_RUN value
 * @property {number} LONG_BALL_EXPERT=4 LONG_BALL_EXPERT value
 * @property {number} LONG_RANGER=6 LONG_RANGER value
 * @property {number} MAZING_RUN=1 MAZING_RUN value
 * @property {number} SPEEDING_BULLET=2 SPEEDING_BULLET value
 * @property {number} TRICKSTER=0 TRICKSTER value
 */
$root.ComPlayingStyle = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[5] = "EARLY_CROSS"] = 5;
    values[valuesById[3] = "INCISIVE_RUN"] = 3;
    values[valuesById[4] = "LONG_BALL_EXPERT"] = 4;
    values[valuesById[6] = "LONG_RANGER"] = 6;
    values[valuesById[1] = "MAZING_RUN"] = 1;
    values[valuesById[2] = "SPEEDING_BULLET"] = 2;
    values[valuesById[0] = "TRICKSTER"] = 0;
    return values;
})();

/**
 * Position enum.
 * @exports Position
 * @enum {string}
 * @property {number} AMF=8 AMF value
 * @property {number} CB=1 CB value
 * @property {number} CF=12 CF value
 * @property {number} CMF=5 CMF value
 * @property {number} DMF=4 DMF value
 * @property {number} GK=0 GK value
 * @property {number} LB=2 LB value
 * @property {number} LMF=6 LMF value
 * @property {number} LWF=9 LWF value
 * @property {number} RB=3 RB value
 * @property {number} RMF=7 RMF value
 * @property {number} RWF=10 RWF value
 * @property {number} SS=11 SS value
 */
$root.Position = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[8] = "AMF"] = 8;
    values[valuesById[1] = "CB"] = 1;
    values[valuesById[12] = "CF"] = 12;
    values[valuesById[5] = "CMF"] = 5;
    values[valuesById[4] = "DMF"] = 4;
    values[valuesById[0] = "GK"] = 0;
    values[valuesById[2] = "LB"] = 2;
    values[valuesById[6] = "LMF"] = 6;
    values[valuesById[9] = "LWF"] = 9;
    values[valuesById[3] = "RB"] = 3;
    values[valuesById[7] = "RMF"] = 7;
    values[valuesById[10] = "RWF"] = 10;
    values[valuesById[11] = "SS"] = 11;
    return values;
})();

/**
 * Skill enum.
 * @exports Skill
 * @enum {string}
 * @property {number} ACROBATIC_CLEAR=24 ACROBATIC_CLEAR value
 * @property {number} ACROBATIC_FINISHING=9 ACROBATIC_FINISHING value
 * @property {number} CAPTAINCY=25 CAPTAINCY value
 * @property {number} CUT_BEHIND_TURN=4 CUT_BEHIND_TURN value
 * @property {number} FIGHTING_SPIRIT=27 FIGHTING_SPIRIT value
 * @property {number} FIRST_TIME_SHOT=11 FIRST_TIME_SHOT value
 * @property {number} FLIP_FLAP=1 FLIP_FLAP value
 * @property {number} GK_LONG_THROW=20 GK_LONG_THROW value
 * @property {number} HEADING=6 HEADING value
 * @property {number} HEEL_TRICK=10 HEEL_TRICK value
 * @property {number} KNUCKLE_SHOT=8 KNUCKLE_SHOT value
 * @property {number} LONG_RANGE_DRIVE=7 LONG_RANGE_DRIVE value
 * @property {number} LONG_THROW=19 LONG_THROW value
 * @property {number} LOW_LOFTED_PASS=17 LOW_LOFTED_PASS value
 * @property {number} LOW_PUNT_TRAJECTORY=18 LOW_PUNT_TRAJECTORY value
 * @property {number} MALICIA=21 MALICIA value
 * @property {number} MAN_MARKING=22 MAN_MARKING value
 * @property {number} MARSEILLE_TURN=2 MARSEILLE_TURN value
 * @property {number} ONE_TOUCH_PASS=12 ONE_TOUCH_PASS value
 * @property {number} OUTSIDE_CURLER=15 OUTSIDE_CURLER value
 * @property {number} PINPOINT_CROSSING=14 PINPOINT_CROSSING value
 * @property {number} RABONA=16 RABONA value
 * @property {number} SCISSORS_FEINT=0 SCISSORS_FEINT value
 * @property {number} SCOTCH_MOVE=5 SCOTCH_MOVE value
 * @property {number} SOMBRERO=3 SOMBRERO value
 * @property {number} SUPER_SUB=26 SUPER_SUB value
 * @property {number} TRACK_BACK=23 TRACK_BACK value
 * @property {number} WEIGHTED_PASS=13 WEIGHTED_PASS value
 */
$root.Skill = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[24] = "ACROBATIC_CLEAR"] = 24;
    values[valuesById[9] = "ACROBATIC_FINISHING"] = 9;
    values[valuesById[25] = "CAPTAINCY"] = 25;
    values[valuesById[4] = "CUT_BEHIND_TURN"] = 4;
    values[valuesById[27] = "FIGHTING_SPIRIT"] = 27;
    values[valuesById[11] = "FIRST_TIME_SHOT"] = 11;
    values[valuesById[1] = "FLIP_FLAP"] = 1;
    values[valuesById[20] = "GK_LONG_THROW"] = 20;
    values[valuesById[6] = "HEADING"] = 6;
    values[valuesById[10] = "HEEL_TRICK"] = 10;
    values[valuesById[8] = "KNUCKLE_SHOT"] = 8;
    values[valuesById[7] = "LONG_RANGE_DRIVE"] = 7;
    values[valuesById[19] = "LONG_THROW"] = 19;
    values[valuesById[17] = "LOW_LOFTED_PASS"] = 17;
    values[valuesById[18] = "LOW_PUNT_TRAJECTORY"] = 18;
    values[valuesById[21] = "MALICIA"] = 21;
    values[valuesById[22] = "MAN_MARKING"] = 22;
    values[valuesById[2] = "MARSEILLE_TURN"] = 2;
    values[valuesById[12] = "ONE_TOUCH_PASS"] = 12;
    values[valuesById[15] = "OUTSIDE_CURLER"] = 15;
    values[valuesById[14] = "PINPOINT_CROSSING"] = 14;
    values[valuesById[16] = "RABONA"] = 16;
    values[valuesById[0] = "SCISSORS_FEINT"] = 0;
    values[valuesById[5] = "SCOTCH_MOVE"] = 5;
    values[valuesById[3] = "SOMBRERO"] = 3;
    values[valuesById[26] = "SUPER_SUB"] = 26;
    values[valuesById[23] = "TRACK_BACK"] = 23;
    values[valuesById[13] = "WEIGHTED_PASS"] = 13;
    return values;
})();

$root.PlayerAppearance = (function() {

    /**
     * Properties of a PlayerAppearance.
     * @exports IPlayerAppearance
     * @interface IPlayerAppearance
     */

    /**
     * Constructs a new PlayerAppearance.
     * @exports PlayerAppearance
     * @classdesc Represents a PlayerAppearance.
     * @implements IPlayerAppearance
     * @constructor
     * @param {IPlayerAppearance=} [properties] Properties to set
     */
    function PlayerAppearance(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new PlayerAppearance instance using the specified properties.
     * @function create
     * @memberof PlayerAppearance
     * @static
     * @param {IPlayerAppearance=} [properties] Properties to set
     * @returns {PlayerAppearance} PlayerAppearance instance
     */
    PlayerAppearance.create = function create(properties) {
        return new PlayerAppearance(properties);
    };

    /**
     * Encodes the specified PlayerAppearance message. Does not implicitly {@link PlayerAppearance.verify|verify} messages.
     * @function encode
     * @memberof PlayerAppearance
     * @static
     * @param {IPlayerAppearance} message PlayerAppearance message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayerAppearance.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified PlayerAppearance message, length delimited. Does not implicitly {@link PlayerAppearance.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PlayerAppearance
     * @static
     * @param {IPlayerAppearance} message PlayerAppearance message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayerAppearance.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PlayerAppearance message from the specified reader or buffer.
     * @function decode
     * @memberof PlayerAppearance
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PlayerAppearance} PlayerAppearance
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayerAppearance.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PlayerAppearance();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PlayerAppearance message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PlayerAppearance
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PlayerAppearance} PlayerAppearance
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayerAppearance.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PlayerAppearance message.
     * @function verify
     * @memberof PlayerAppearance
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PlayerAppearance.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates a PlayerAppearance message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PlayerAppearance
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PlayerAppearance} PlayerAppearance
     */
    PlayerAppearance.fromObject = function fromObject(object) {
        if (object instanceof $root.PlayerAppearance)
            return object;
        return new $root.PlayerAppearance();
    };

    /**
     * Creates a plain object from a PlayerAppearance message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PlayerAppearance
     * @static
     * @param {PlayerAppearance} message PlayerAppearance
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PlayerAppearance.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this PlayerAppearance to JSON.
     * @function toJSON
     * @memberof PlayerAppearance
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PlayerAppearance.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PlayerAppearance;
})();

$root.PlayerMotion = (function() {

    /**
     * Properties of a PlayerMotion.
     * @exports IPlayerMotion
     * @interface IPlayerMotion
     * @property {number|null} [armDribbling] PlayerMotion armDribbling
     * @property {number|null} [armRunning] PlayerMotion armRunning
     * @property {number|null} [cornerKick] PlayerMotion cornerKick
     * @property {number|null} [freeKick] PlayerMotion freeKick
     * @property {number|null} [goalCelebration1] PlayerMotion goalCelebration1
     * @property {number|null} [goalCelebration2] PlayerMotion goalCelebration2
     * @property {number|null} [hunchingDribbling] PlayerMotion hunchingDribbling
     * @property {number|null} [hunchingRunning] PlayerMotion hunchingRunning
     * @property {number|null} [penaltyKick] PlayerMotion penaltyKick
     */

    /**
     * Constructs a new PlayerMotion.
     * @exports PlayerMotion
     * @classdesc Represents a PlayerMotion.
     * @implements IPlayerMotion
     * @constructor
     * @param {IPlayerMotion=} [properties] Properties to set
     */
    function PlayerMotion(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PlayerMotion armDribbling.
     * @member {number} armDribbling
     * @memberof PlayerMotion
     * @instance
     */
    PlayerMotion.prototype.armDribbling = 0;

    /**
     * PlayerMotion armRunning.
     * @member {number} armRunning
     * @memberof PlayerMotion
     * @instance
     */
    PlayerMotion.prototype.armRunning = 0;

    /**
     * PlayerMotion cornerKick.
     * @member {number} cornerKick
     * @memberof PlayerMotion
     * @instance
     */
    PlayerMotion.prototype.cornerKick = 0;

    /**
     * PlayerMotion freeKick.
     * @member {number} freeKick
     * @memberof PlayerMotion
     * @instance
     */
    PlayerMotion.prototype.freeKick = 0;

    /**
     * PlayerMotion goalCelebration1.
     * @member {number} goalCelebration1
     * @memberof PlayerMotion
     * @instance
     */
    PlayerMotion.prototype.goalCelebration1 = 0;

    /**
     * PlayerMotion goalCelebration2.
     * @member {number} goalCelebration2
     * @memberof PlayerMotion
     * @instance
     */
    PlayerMotion.prototype.goalCelebration2 = 0;

    /**
     * PlayerMotion hunchingDribbling.
     * @member {number} hunchingDribbling
     * @memberof PlayerMotion
     * @instance
     */
    PlayerMotion.prototype.hunchingDribbling = 0;

    /**
     * PlayerMotion hunchingRunning.
     * @member {number} hunchingRunning
     * @memberof PlayerMotion
     * @instance
     */
    PlayerMotion.prototype.hunchingRunning = 0;

    /**
     * PlayerMotion penaltyKick.
     * @member {number} penaltyKick
     * @memberof PlayerMotion
     * @instance
     */
    PlayerMotion.prototype.penaltyKick = 0;

    /**
     * Creates a new PlayerMotion instance using the specified properties.
     * @function create
     * @memberof PlayerMotion
     * @static
     * @param {IPlayerMotion=} [properties] Properties to set
     * @returns {PlayerMotion} PlayerMotion instance
     */
    PlayerMotion.create = function create(properties) {
        return new PlayerMotion(properties);
    };

    /**
     * Encodes the specified PlayerMotion message. Does not implicitly {@link PlayerMotion.verify|verify} messages.
     * @function encode
     * @memberof PlayerMotion
     * @static
     * @param {IPlayerMotion} message PlayerMotion message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayerMotion.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.armDribbling != null && message.hasOwnProperty("armDribbling"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.armDribbling);
        if (message.armRunning != null && message.hasOwnProperty("armRunning"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.armRunning);
        if (message.cornerKick != null && message.hasOwnProperty("cornerKick"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.cornerKick);
        if (message.freeKick != null && message.hasOwnProperty("freeKick"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.freeKick);
        if (message.goalCelebration1 != null && message.hasOwnProperty("goalCelebration1"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.goalCelebration1);
        if (message.goalCelebration2 != null && message.hasOwnProperty("goalCelebration2"))
            writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.goalCelebration2);
        if (message.hunchingDribbling != null && message.hasOwnProperty("hunchingDribbling"))
            writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.hunchingDribbling);
        if (message.hunchingRunning != null && message.hasOwnProperty("hunchingRunning"))
            writer.uint32(/* id 9, wireType 0 =*/72).uint32(message.hunchingRunning);
        if (message.penaltyKick != null && message.hasOwnProperty("penaltyKick"))
            writer.uint32(/* id 10, wireType 0 =*/80).uint32(message.penaltyKick);
        return writer;
    };

    /**
     * Encodes the specified PlayerMotion message, length delimited. Does not implicitly {@link PlayerMotion.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PlayerMotion
     * @static
     * @param {IPlayerMotion} message PlayerMotion message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayerMotion.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PlayerMotion message from the specified reader or buffer.
     * @function decode
     * @memberof PlayerMotion
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PlayerMotion} PlayerMotion
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayerMotion.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PlayerMotion();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.armDribbling = reader.uint32();
                break;
            case 2:
                message.armRunning = reader.uint32();
                break;
            case 3:
                message.cornerKick = reader.uint32();
                break;
            case 4:
                message.freeKick = reader.uint32();
                break;
            case 5:
                message.goalCelebration1 = reader.uint32();
                break;
            case 6:
                message.goalCelebration2 = reader.uint32();
                break;
            case 8:
                message.hunchingDribbling = reader.uint32();
                break;
            case 9:
                message.hunchingRunning = reader.uint32();
                break;
            case 10:
                message.penaltyKick = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PlayerMotion message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PlayerMotion
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PlayerMotion} PlayerMotion
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayerMotion.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PlayerMotion message.
     * @function verify
     * @memberof PlayerMotion
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PlayerMotion.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.armDribbling != null && message.hasOwnProperty("armDribbling"))
            if (!$util.isInteger(message.armDribbling))
                return "armDribbling: integer expected";
        if (message.armRunning != null && message.hasOwnProperty("armRunning"))
            if (!$util.isInteger(message.armRunning))
                return "armRunning: integer expected";
        if (message.cornerKick != null && message.hasOwnProperty("cornerKick"))
            if (!$util.isInteger(message.cornerKick))
                return "cornerKick: integer expected";
        if (message.freeKick != null && message.hasOwnProperty("freeKick"))
            if (!$util.isInteger(message.freeKick))
                return "freeKick: integer expected";
        if (message.goalCelebration1 != null && message.hasOwnProperty("goalCelebration1"))
            if (!$util.isInteger(message.goalCelebration1))
                return "goalCelebration1: integer expected";
        if (message.goalCelebration2 != null && message.hasOwnProperty("goalCelebration2"))
            if (!$util.isInteger(message.goalCelebration2))
                return "goalCelebration2: integer expected";
        if (message.hunchingDribbling != null && message.hasOwnProperty("hunchingDribbling"))
            if (!$util.isInteger(message.hunchingDribbling))
                return "hunchingDribbling: integer expected";
        if (message.hunchingRunning != null && message.hasOwnProperty("hunchingRunning"))
            if (!$util.isInteger(message.hunchingRunning))
                return "hunchingRunning: integer expected";
        if (message.penaltyKick != null && message.hasOwnProperty("penaltyKick"))
            if (!$util.isInteger(message.penaltyKick))
                return "penaltyKick: integer expected";
        return null;
    };

    /**
     * Creates a PlayerMotion message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PlayerMotion
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PlayerMotion} PlayerMotion
     */
    PlayerMotion.fromObject = function fromObject(object) {
        if (object instanceof $root.PlayerMotion)
            return object;
        var message = new $root.PlayerMotion();
        if (object.armDribbling != null)
            message.armDribbling = object.armDribbling >>> 0;
        if (object.armRunning != null)
            message.armRunning = object.armRunning >>> 0;
        if (object.cornerKick != null)
            message.cornerKick = object.cornerKick >>> 0;
        if (object.freeKick != null)
            message.freeKick = object.freeKick >>> 0;
        if (object.goalCelebration1 != null)
            message.goalCelebration1 = object.goalCelebration1 >>> 0;
        if (object.goalCelebration2 != null)
            message.goalCelebration2 = object.goalCelebration2 >>> 0;
        if (object.hunchingDribbling != null)
            message.hunchingDribbling = object.hunchingDribbling >>> 0;
        if (object.hunchingRunning != null)
            message.hunchingRunning = object.hunchingRunning >>> 0;
        if (object.penaltyKick != null)
            message.penaltyKick = object.penaltyKick >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a PlayerMotion message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PlayerMotion
     * @static
     * @param {PlayerMotion} message PlayerMotion
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PlayerMotion.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.armDribbling = 0;
            object.armRunning = 0;
            object.cornerKick = 0;
            object.freeKick = 0;
            object.goalCelebration1 = 0;
            object.goalCelebration2 = 0;
            object.hunchingDribbling = 0;
            object.hunchingRunning = 0;
            object.penaltyKick = 0;
        }
        if (message.armDribbling != null && message.hasOwnProperty("armDribbling"))
            object.armDribbling = message.armDribbling;
        if (message.armRunning != null && message.hasOwnProperty("armRunning"))
            object.armRunning = message.armRunning;
        if (message.cornerKick != null && message.hasOwnProperty("cornerKick"))
            object.cornerKick = message.cornerKick;
        if (message.freeKick != null && message.hasOwnProperty("freeKick"))
            object.freeKick = message.freeKick;
        if (message.goalCelebration1 != null && message.hasOwnProperty("goalCelebration1"))
            object.goalCelebration1 = message.goalCelebration1;
        if (message.goalCelebration2 != null && message.hasOwnProperty("goalCelebration2"))
            object.goalCelebration2 = message.goalCelebration2;
        if (message.hunchingDribbling != null && message.hasOwnProperty("hunchingDribbling"))
            object.hunchingDribbling = message.hunchingDribbling;
        if (message.hunchingRunning != null && message.hasOwnProperty("hunchingRunning"))
            object.hunchingRunning = message.hunchingRunning;
        if (message.penaltyKick != null && message.hasOwnProperty("penaltyKick"))
            object.penaltyKick = message.penaltyKick;
        return object;
    };

    /**
     * Converts this PlayerMotion to JSON.
     * @function toJSON
     * @memberof PlayerMotion
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PlayerMotion.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PlayerMotion;
})();

$root.Edits = (function() {

    /**
     * Properties of an Edits.
     * @exports IEdits
     * @interface IEdits
     * @property {boolean|null} [registeredPosition] Edits registeredPosition
     * @property {boolean|null} [playablePositions] Edits playablePositions
     * @property {boolean|null} [basics] Edits basics
     * @property {boolean|null} [abilities] Edits abilities
     * @property {boolean|null} [playerSkills] Edits playerSkills
     * @property {boolean|null} [playingStyle] Edits playingStyle
     * @property {boolean|null} [comPlayingStyles] Edits comPlayingStyles
     * @property {boolean|null} [motion] Edits motion
     */

    /**
     * Constructs a new Edits.
     * @exports Edits
     * @classdesc Reports if certain parts of a player are edited.
     * @implements IEdits
     * @constructor
     * @param {IEdits=} [properties] Properties to set
     */
    function Edits(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Edits registeredPosition.
     * @member {boolean} registeredPosition
     * @memberof Edits
     * @instance
     */
    Edits.prototype.registeredPosition = false;

    /**
     * Edits playablePositions.
     * @member {boolean} playablePositions
     * @memberof Edits
     * @instance
     */
    Edits.prototype.playablePositions = false;

    /**
     * Edits basics.
     * @member {boolean} basics
     * @memberof Edits
     * @instance
     */
    Edits.prototype.basics = false;

    /**
     * Edits abilities.
     * @member {boolean} abilities
     * @memberof Edits
     * @instance
     */
    Edits.prototype.abilities = false;

    /**
     * Edits playerSkills.
     * @member {boolean} playerSkills
     * @memberof Edits
     * @instance
     */
    Edits.prototype.playerSkills = false;

    /**
     * Edits playingStyle.
     * @member {boolean} playingStyle
     * @memberof Edits
     * @instance
     */
    Edits.prototype.playingStyle = false;

    /**
     * Edits comPlayingStyles.
     * @member {boolean} comPlayingStyles
     * @memberof Edits
     * @instance
     */
    Edits.prototype.comPlayingStyles = false;

    /**
     * Edits motion.
     * @member {boolean} motion
     * @memberof Edits
     * @instance
     */
    Edits.prototype.motion = false;

    /**
     * Creates a new Edits instance using the specified properties.
     * @function create
     * @memberof Edits
     * @static
     * @param {IEdits=} [properties] Properties to set
     * @returns {Edits} Edits instance
     */
    Edits.create = function create(properties) {
        return new Edits(properties);
    };

    /**
     * Encodes the specified Edits message. Does not implicitly {@link Edits.verify|verify} messages.
     * @function encode
     * @memberof Edits
     * @static
     * @param {IEdits} message Edits message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Edits.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.registeredPosition != null && message.hasOwnProperty("registeredPosition"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.registeredPosition);
        if (message.playablePositions != null && message.hasOwnProperty("playablePositions"))
            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.playablePositions);
        if (message.basics != null && message.hasOwnProperty("basics"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.basics);
        if (message.abilities != null && message.hasOwnProperty("abilities"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.abilities);
        if (message.playerSkills != null && message.hasOwnProperty("playerSkills"))
            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.playerSkills);
        if (message.playingStyle != null && message.hasOwnProperty("playingStyle"))
            writer.uint32(/* id 6, wireType 0 =*/48).bool(message.playingStyle);
        if (message.comPlayingStyles != null && message.hasOwnProperty("comPlayingStyles"))
            writer.uint32(/* id 7, wireType 0 =*/56).bool(message.comPlayingStyles);
        if (message.motion != null && message.hasOwnProperty("motion"))
            writer.uint32(/* id 8, wireType 0 =*/64).bool(message.motion);
        return writer;
    };

    /**
     * Encodes the specified Edits message, length delimited. Does not implicitly {@link Edits.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Edits
     * @static
     * @param {IEdits} message Edits message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Edits.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Edits message from the specified reader or buffer.
     * @function decode
     * @memberof Edits
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Edits} Edits
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Edits.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Edits();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.registeredPosition = reader.bool();
                break;
            case 2:
                message.playablePositions = reader.bool();
                break;
            case 3:
                message.basics = reader.bool();
                break;
            case 4:
                message.abilities = reader.bool();
                break;
            case 5:
                message.playerSkills = reader.bool();
                break;
            case 6:
                message.playingStyle = reader.bool();
                break;
            case 7:
                message.comPlayingStyles = reader.bool();
                break;
            case 8:
                message.motion = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Edits message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Edits
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Edits} Edits
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Edits.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Edits message.
     * @function verify
     * @memberof Edits
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Edits.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.registeredPosition != null && message.hasOwnProperty("registeredPosition"))
            if (typeof message.registeredPosition !== "boolean")
                return "registeredPosition: boolean expected";
        if (message.playablePositions != null && message.hasOwnProperty("playablePositions"))
            if (typeof message.playablePositions !== "boolean")
                return "playablePositions: boolean expected";
        if (message.basics != null && message.hasOwnProperty("basics"))
            if (typeof message.basics !== "boolean")
                return "basics: boolean expected";
        if (message.abilities != null && message.hasOwnProperty("abilities"))
            if (typeof message.abilities !== "boolean")
                return "abilities: boolean expected";
        if (message.playerSkills != null && message.hasOwnProperty("playerSkills"))
            if (typeof message.playerSkills !== "boolean")
                return "playerSkills: boolean expected";
        if (message.playingStyle != null && message.hasOwnProperty("playingStyle"))
            if (typeof message.playingStyle !== "boolean")
                return "playingStyle: boolean expected";
        if (message.comPlayingStyles != null && message.hasOwnProperty("comPlayingStyles"))
            if (typeof message.comPlayingStyles !== "boolean")
                return "comPlayingStyles: boolean expected";
        if (message.motion != null && message.hasOwnProperty("motion"))
            if (typeof message.motion !== "boolean")
                return "motion: boolean expected";
        return null;
    };

    /**
     * Creates an Edits message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Edits
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Edits} Edits
     */
    Edits.fromObject = function fromObject(object) {
        if (object instanceof $root.Edits)
            return object;
        var message = new $root.Edits();
        if (object.registeredPosition != null)
            message.registeredPosition = Boolean(object.registeredPosition);
        if (object.playablePositions != null)
            message.playablePositions = Boolean(object.playablePositions);
        if (object.basics != null)
            message.basics = Boolean(object.basics);
        if (object.abilities != null)
            message.abilities = Boolean(object.abilities);
        if (object.playerSkills != null)
            message.playerSkills = Boolean(object.playerSkills);
        if (object.playingStyle != null)
            message.playingStyle = Boolean(object.playingStyle);
        if (object.comPlayingStyles != null)
            message.comPlayingStyles = Boolean(object.comPlayingStyles);
        if (object.motion != null)
            message.motion = Boolean(object.motion);
        return message;
    };

    /**
     * Creates a plain object from an Edits message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Edits
     * @static
     * @param {Edits} message Edits
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Edits.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.registeredPosition = false;
            object.playablePositions = false;
            object.basics = false;
            object.abilities = false;
            object.playerSkills = false;
            object.playingStyle = false;
            object.comPlayingStyles = false;
            object.motion = false;
        }
        if (message.registeredPosition != null && message.hasOwnProperty("registeredPosition"))
            object.registeredPosition = message.registeredPosition;
        if (message.playablePositions != null && message.hasOwnProperty("playablePositions"))
            object.playablePositions = message.playablePositions;
        if (message.basics != null && message.hasOwnProperty("basics"))
            object.basics = message.basics;
        if (message.abilities != null && message.hasOwnProperty("abilities"))
            object.abilities = message.abilities;
        if (message.playerSkills != null && message.hasOwnProperty("playerSkills"))
            object.playerSkills = message.playerSkills;
        if (message.playingStyle != null && message.hasOwnProperty("playingStyle"))
            object.playingStyle = message.playingStyle;
        if (message.comPlayingStyles != null && message.hasOwnProperty("comPlayingStyles"))
            object.comPlayingStyles = message.comPlayingStyles;
        if (message.motion != null && message.hasOwnProperty("motion"))
            object.motion = message.motion;
        return object;
    };

    /**
     * Converts this Edits to JSON.
     * @function toJSON
     * @memberof Edits
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Edits.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Edits;
})();

$root.UnknownOptions = (function() {

    /**
     * Properties of an UnknownOptions.
     * @exports IUnknownOptions
     * @interface IUnknownOptions
     * @property {boolean|null} [unknown02] UnknownOptions unknown02
     * @property {boolean|null} [unknown03] UnknownOptions unknown03
     * @property {boolean|null} [unknown04] UnknownOptions unknown04
     * @property {boolean|null} [unknown05] UnknownOptions unknown05
     * @property {number|null} [unknown06] UnknownOptions unknown06
     */

    /**
     * Constructs a new UnknownOptions.
     * @exports UnknownOptions
     * @classdesc Bytes/bits of the player data that are not yet known
     * @implements IUnknownOptions
     * @constructor
     * @param {IUnknownOptions=} [properties] Properties to set
     */
    function UnknownOptions(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * UnknownOptions unknown02.
     * @member {boolean} unknown02
     * @memberof UnknownOptions
     * @instance
     */
    UnknownOptions.prototype.unknown02 = false;

    /**
     * UnknownOptions unknown03.
     * @member {boolean} unknown03
     * @memberof UnknownOptions
     * @instance
     */
    UnknownOptions.prototype.unknown03 = false;

    /**
     * UnknownOptions unknown04.
     * @member {boolean} unknown04
     * @memberof UnknownOptions
     * @instance
     */
    UnknownOptions.prototype.unknown04 = false;

    /**
     * UnknownOptions unknown05.
     * @member {boolean} unknown05
     * @memberof UnknownOptions
     * @instance
     */
    UnknownOptions.prototype.unknown05 = false;

    /**
     * UnknownOptions unknown06.
     * @member {number} unknown06
     * @memberof UnknownOptions
     * @instance
     */
    UnknownOptions.prototype.unknown06 = 0;

    /**
     * Creates a new UnknownOptions instance using the specified properties.
     * @function create
     * @memberof UnknownOptions
     * @static
     * @param {IUnknownOptions=} [properties] Properties to set
     * @returns {UnknownOptions} UnknownOptions instance
     */
    UnknownOptions.create = function create(properties) {
        return new UnknownOptions(properties);
    };

    /**
     * Encodes the specified UnknownOptions message. Does not implicitly {@link UnknownOptions.verify|verify} messages.
     * @function encode
     * @memberof UnknownOptions
     * @static
     * @param {IUnknownOptions} message UnknownOptions message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UnknownOptions.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.unknown02 != null && message.hasOwnProperty("unknown02"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.unknown02);
        if (message.unknown03 != null && message.hasOwnProperty("unknown03"))
            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.unknown03);
        if (message.unknown04 != null && message.hasOwnProperty("unknown04"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.unknown04);
        if (message.unknown05 != null && message.hasOwnProperty("unknown05"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.unknown05);
        if (message.unknown06 != null && message.hasOwnProperty("unknown06"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.unknown06);
        return writer;
    };

    /**
     * Encodes the specified UnknownOptions message, length delimited. Does not implicitly {@link UnknownOptions.verify|verify} messages.
     * @function encodeDelimited
     * @memberof UnknownOptions
     * @static
     * @param {IUnknownOptions} message UnknownOptions message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UnknownOptions.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an UnknownOptions message from the specified reader or buffer.
     * @function decode
     * @memberof UnknownOptions
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {UnknownOptions} UnknownOptions
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UnknownOptions.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.UnknownOptions();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.unknown02 = reader.bool();
                break;
            case 2:
                message.unknown03 = reader.bool();
                break;
            case 3:
                message.unknown04 = reader.bool();
                break;
            case 4:
                message.unknown05 = reader.bool();
                break;
            case 5:
                message.unknown06 = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an UnknownOptions message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof UnknownOptions
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {UnknownOptions} UnknownOptions
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UnknownOptions.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an UnknownOptions message.
     * @function verify
     * @memberof UnknownOptions
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    UnknownOptions.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.unknown02 != null && message.hasOwnProperty("unknown02"))
            if (typeof message.unknown02 !== "boolean")
                return "unknown02: boolean expected";
        if (message.unknown03 != null && message.hasOwnProperty("unknown03"))
            if (typeof message.unknown03 !== "boolean")
                return "unknown03: boolean expected";
        if (message.unknown04 != null && message.hasOwnProperty("unknown04"))
            if (typeof message.unknown04 !== "boolean")
                return "unknown04: boolean expected";
        if (message.unknown05 != null && message.hasOwnProperty("unknown05"))
            if (typeof message.unknown05 !== "boolean")
                return "unknown05: boolean expected";
        if (message.unknown06 != null && message.hasOwnProperty("unknown06"))
            if (!$util.isInteger(message.unknown06))
                return "unknown06: integer expected";
        return null;
    };

    /**
     * Creates an UnknownOptions message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof UnknownOptions
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {UnknownOptions} UnknownOptions
     */
    UnknownOptions.fromObject = function fromObject(object) {
        if (object instanceof $root.UnknownOptions)
            return object;
        var message = new $root.UnknownOptions();
        if (object.unknown02 != null)
            message.unknown02 = Boolean(object.unknown02);
        if (object.unknown03 != null)
            message.unknown03 = Boolean(object.unknown03);
        if (object.unknown04 != null)
            message.unknown04 = Boolean(object.unknown04);
        if (object.unknown05 != null)
            message.unknown05 = Boolean(object.unknown05);
        if (object.unknown06 != null)
            message.unknown06 = object.unknown06 >>> 0;
        return message;
    };

    /**
     * Creates a plain object from an UnknownOptions message. Also converts values to other types if specified.
     * @function toObject
     * @memberof UnknownOptions
     * @static
     * @param {UnknownOptions} message UnknownOptions
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    UnknownOptions.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.unknown02 = false;
            object.unknown03 = false;
            object.unknown04 = false;
            object.unknown05 = false;
            object.unknown06 = 0;
        }
        if (message.unknown02 != null && message.hasOwnProperty("unknown02"))
            object.unknown02 = message.unknown02;
        if (message.unknown03 != null && message.hasOwnProperty("unknown03"))
            object.unknown03 = message.unknown03;
        if (message.unknown04 != null && message.hasOwnProperty("unknown04"))
            object.unknown04 = message.unknown04;
        if (message.unknown05 != null && message.hasOwnProperty("unknown05"))
            object.unknown05 = message.unknown05;
        if (message.unknown06 != null && message.hasOwnProperty("unknown06"))
            object.unknown06 = message.unknown06;
        return object;
    };

    /**
     * Converts this UnknownOptions to JSON.
     * @function toJSON
     * @memberof UnknownOptions
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    UnknownOptions.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return UnknownOptions;
})();

module.exports = $root;
