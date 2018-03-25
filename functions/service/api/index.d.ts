import * as $protobuf from "protobufjs";

/** Represents a API */
export class API extends $protobuf.rpc.Service {

    /**
     * Constructs a new API service.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     */
    constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

    /**
     * Creates new API service using the specified rpc implementation.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     * @returns RPC service. Useful where requests and/or responses are streamed.
     */
    public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): API;

    /**
     * Calls GetPlayer.
     * @param request GetPlayerRequest message or plain object
     * @param callback Node-style callback called with the error, if any, and Player
     */
    public getPlayer(request: IGetPlayerRequest, callback: API.GetPlayerCallback): void;

    /**
     * Calls GetPlayer.
     * @param request GetPlayerRequest message or plain object
     * @returns Promise
     */
    public getPlayer(request: IGetPlayerRequest): Promise<Player>;

    /**
     * Calls UpdatePlayer.
     * @param request UpdatePlayerRequest message or plain object
     * @param callback Node-style callback called with the error, if any, and Player
     */
    public updatePlayer(request: IUpdatePlayerRequest, callback: API.UpdatePlayerCallback): void;

    /**
     * Calls UpdatePlayer.
     * @param request UpdatePlayerRequest message or plain object
     * @returns Promise
     */
    public updatePlayer(request: IUpdatePlayerRequest): Promise<Player>;

    /**
     * Calls AddPlayer.
     * @param request AddPlayerRequest message or plain object
     * @param callback Node-style callback called with the error, if any, and Player
     */
    public addPlayer(request: IAddPlayerRequest, callback: API.AddPlayerCallback): void;

    /**
     * Calls AddPlayer.
     * @param request AddPlayerRequest message or plain object
     * @returns Promise
     */
    public addPlayer(request: IAddPlayerRequest): Promise<Player>;
}

export namespace API {

    /**
     * Callback as used by {@link API#getPlayer}.
     * @param error Error, if any
     * @param [response] Player
     */
    type GetPlayerCallback = (error: (Error|null), response?: Player) => void;

    /**
     * Callback as used by {@link API#updatePlayer}.
     * @param error Error, if any
     * @param [response] Player
     */
    type UpdatePlayerCallback = (error: (Error|null), response?: Player) => void;

    /**
     * Callback as used by {@link API#addPlayer}.
     * @param error Error, if any
     * @param [response] Player
     */
    type AddPlayerCallback = (error: (Error|null), response?: Player) => void;
}

/** Properties of a GetPlayerRequest. */
export interface IGetPlayerRequest {

    /** GetPlayerRequest playerId */
    playerId?: (string|null);
}

/** Represents a GetPlayerRequest. */
export class GetPlayerRequest implements IGetPlayerRequest {

    /**
     * Constructs a new GetPlayerRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: IGetPlayerRequest);

    /** GetPlayerRequest playerId. */
    public playerId: string;

    /**
     * Creates a new GetPlayerRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns GetPlayerRequest instance
     */
    public static create(properties?: IGetPlayerRequest): GetPlayerRequest;

    /**
     * Encodes the specified GetPlayerRequest message. Does not implicitly {@link GetPlayerRequest.verify|verify} messages.
     * @param message GetPlayerRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IGetPlayerRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified GetPlayerRequest message, length delimited. Does not implicitly {@link GetPlayerRequest.verify|verify} messages.
     * @param message GetPlayerRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IGetPlayerRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a GetPlayerRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns GetPlayerRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GetPlayerRequest;

    /**
     * Decodes a GetPlayerRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns GetPlayerRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GetPlayerRequest;

    /**
     * Verifies a GetPlayerRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a GetPlayerRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns GetPlayerRequest
     */
    public static fromObject(object: { [k: string]: any }): GetPlayerRequest;

    /**
     * Creates a plain object from a GetPlayerRequest message. Also converts values to other types if specified.
     * @param message GetPlayerRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: GetPlayerRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this GetPlayerRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an UpdatePlayerRequest. */
export interface IUpdatePlayerRequest {

    /** UpdatePlayerRequest playerId */
    playerId?: (string|null);

    /** UpdatePlayerRequest player */
    player?: (IPlayer|null);
}

/** Represents an UpdatePlayerRequest. */
export class UpdatePlayerRequest implements IUpdatePlayerRequest {

    /**
     * Constructs a new UpdatePlayerRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: IUpdatePlayerRequest);

    /** UpdatePlayerRequest playerId. */
    public playerId: string;

    /** UpdatePlayerRequest player. */
    public player?: (IPlayer|null);

    /**
     * Creates a new UpdatePlayerRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns UpdatePlayerRequest instance
     */
    public static create(properties?: IUpdatePlayerRequest): UpdatePlayerRequest;

    /**
     * Encodes the specified UpdatePlayerRequest message. Does not implicitly {@link UpdatePlayerRequest.verify|verify} messages.
     * @param message UpdatePlayerRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IUpdatePlayerRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified UpdatePlayerRequest message, length delimited. Does not implicitly {@link UpdatePlayerRequest.verify|verify} messages.
     * @param message UpdatePlayerRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IUpdatePlayerRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an UpdatePlayerRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns UpdatePlayerRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UpdatePlayerRequest;

    /**
     * Decodes an UpdatePlayerRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns UpdatePlayerRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UpdatePlayerRequest;

    /**
     * Verifies an UpdatePlayerRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an UpdatePlayerRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns UpdatePlayerRequest
     */
    public static fromObject(object: { [k: string]: any }): UpdatePlayerRequest;

    /**
     * Creates a plain object from an UpdatePlayerRequest message. Also converts values to other types if specified.
     * @param message UpdatePlayerRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: UpdatePlayerRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this UpdatePlayerRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an AddPlayerRequest. */
export interface IAddPlayerRequest {

    /** AddPlayerRequest player */
    player?: (IPlayer|null);
}

/** Represents an AddPlayerRequest. */
export class AddPlayerRequest implements IAddPlayerRequest {

    /**
     * Constructs a new AddPlayerRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: IAddPlayerRequest);

    /** AddPlayerRequest player. */
    public player?: (IPlayer|null);

    /**
     * Creates a new AddPlayerRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns AddPlayerRequest instance
     */
    public static create(properties?: IAddPlayerRequest): AddPlayerRequest;

    /**
     * Encodes the specified AddPlayerRequest message. Does not implicitly {@link AddPlayerRequest.verify|verify} messages.
     * @param message AddPlayerRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IAddPlayerRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified AddPlayerRequest message, length delimited. Does not implicitly {@link AddPlayerRequest.verify|verify} messages.
     * @param message AddPlayerRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IAddPlayerRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an AddPlayerRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns AddPlayerRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AddPlayerRequest;

    /**
     * Decodes an AddPlayerRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns AddPlayerRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AddPlayerRequest;

    /**
     * Verifies an AddPlayerRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an AddPlayerRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns AddPlayerRequest
     */
    public static fromObject(object: { [k: string]: any }): AddPlayerRequest;

    /**
     * Creates a plain object from an AddPlayerRequest message. Also converts values to other types if specified.
     * @param message AddPlayerRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: AddPlayerRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this AddPlayerRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Country enum. */
export enum Country {
    AFGHANISTAN = 1,
    ALBANIA = 191,
    ALGERIA = 44,
    ANDORRA = 192,
    ANGOLA = 45,
    ANTIGUA_AND_BARBUDA = 104,
    ARGENTINA = 144,
    ARMENIA = 193,
    ARUBA = 105,
    AUSTRALIA = 162,
    AUSTRIA = 194,
    AZERBAIJAN = 195,
    BAHRAIN = 2,
    BANGLADESH = 3,
    BARBADOS = 107,
    BELARUS = 196,
    BELGIUM = 197,
    BENIN = 46,
    BERMUDA = 109,
    BOLIVIA = 145,
    BOSNIA_AND_HERZEGOVINA = 198,
    BOTSWANA = 47,
    BRAZIL = 146,
    BULGARIA = 199,
    BURKINA_FASO = 48,
    BURUNDI = 49,
    CAMEROON = 50,
    CANADA = 110,
    CAPE_VERDE = 51,
    CENTRAL_AFRICAN_REP = 52,
    CHAD = 53,
    CHILE = 147,
    CHINA = 7,
    COLOMBIA = 148,
    CONGO = 98,
    CONGO_DR = 55,
    COSTA_RICA = 112,
    COTE_D_IVOIRE = 56,
    CROATIA = 200,
    CUBA = 113,
    CURACAO = 140,
    CYPRUS = 201,
    CZECH_REPUBLIC = 202,
    DENMARK = 203,
    DOMINICAN_REPUBLIC = 115,
    ECUADOR = 149,
    EGYPT = 58,
    EL_SALVADOR = 116,
    ENGLAND = 204,
    EQUATORIAL_GUINEA = 59,
    ERITREA = 60,
    ESTONIA = 205,
    ETHIOPIA = 61,
    FAROE_ISLANDS = 206,
    FIJI = 164,
    FINLAND = 207,
    FRANCE = 208,
    FRENCH_GUIANA = 138,
    GABON = 62,
    GEORGIA = 209,
    GERMANY = 210,
    GHANA = 64,
    GREECE = 211,
    GRENADA = 117,
    GUADELOUPE = 118,
    GUATEMALA = 119,
    GUINEA = 65,
    GUINEA_BISSAU = 66,
    GUYANA = 159,
    HAITI = 120,
    HONDURAS = 121,
    HUNGARY = 212,
    ICELAND = 213,
    INDIA = 9,
    INDONESIA = 10,
    IRAN = 11,
    IRAQ = 12,
    IRELAND = 214,
    ISRAEL = 189,
    ITALY = 215,
    JAMAICA = 122,
    JAPAN = 13,
    JORDAN = 14,
    KAZAKHSTAN = 216,
    KENYA = 67,
    KOSOVO = 311,
    KUWAIT = 17,
    KYRGYZ_REPUBLIC = 40,
    LAOS = 18,
    LATVIA = 217,
    LEBANON = 19,
    LIBERIA = 69,
    LIBYA = 70,
    LIECHTENSTEIN = 218,
    LITHUANIA = 219,
    LUXEMBOURG = 220,
    MACEDONIA = 221,
    MADAGASCAR = 71,
    MALAWI = 72,
    MALAYSIA = 21,
    MALDIVES = 22,
    MALI = 73,
    MALTA = 222,
    MARTINIQUE = 123,
    MAURITANIA = 74,
    MAURITIUS = 75,
    MEXICO = 124,
    MOLDOVA = 223,
    MONACO = 250,
    MONTENEGRO = 304,
    MONTSERRAT = 125,
    MOROCCO = 76,
    MOZAMBIQUE = 77,
    NAMIBIA = 78,
    NETHERLANDS = 224,
    NETHERLANDS_ANTILLES = 126,
    NEW_CALEDONIA = 165,
    NEW_ZEALAND = 166,
    NIGER = 79,
    NIGERIA = 80,
    NORTH_KOREA = 15,
    NORTHERN_IRELAND = 225,
    NORWAY = 226,
    OMAN = 26,
    OTHERS = 260,
    PAKISTAN = 27,
    PALESTINE = 28,
    PANAMA = 128,
    PAPUA_NEW_GUINEA = 167,
    PARAGUAY = 150,
    PERU = 151,
    PHILIPPINES = 29,
    POLAND = 227,
    PORTUGAL = 228,
    PUERTO_RICO = 129,
    QATAR = 30,
    REPUBLIC_OF_THE_GAMBIA = 63,
    REUNION = 100,
    ROMANIA = 229,
    RUSSIA = 230,
    RWANDA = 81,
    SAMOA = 168,
    SAN_MARINO = 231,
    SAUDI_ARABIA = 31,
    SCOTLAND = 232,
    SENEGAL = 83,
    SERBIA = 303,
    SIERRA_LEONE = 85,
    SINGAPORE = 32,
    SINT_MAARTEN = 310,
    SLOVAKIA = 234,
    SLOVENIA = 235,
    SOLOMON_ISLANDS = 169,
    SOMALIA = 86,
    SOUTH_AFRICA = 87,
    SOUTH_KOREA = 16,
    SOUTH_SUDAN = 312,
    SPAIN = 236,
    SRI_LANKA = 33,
    SUDAN = 88,
    SWEDEN = 237,
    SWITZERLAND = 238,
    SYRIA = 34,
    TAHITI = 170,
    TAIWAN = 298,
    TAJIKISTAN = 41,
    THAILAND = 36,
    THE_COMOROS = 54,
    TOGO = 91,
    TRINIDAD_AND_TOBAGO = 133,
    TUNISIA = 92,
    TURKEY = 190,
    TURKMENISTAN = 42,
    TURKS_AND_CAICOS_IS = 134,
    UAE = 37,
    UGANDA = 93,
    UKRAINE = 239,
    UNITED_STATES = 135,
    URUGUAY = 152,
    UZBEKISTAN = 240,
    VENEZUELA = 153,
    VIETNAM = 38,
    WALES = 241,
    ZAMBIA = 94,
    ZIMBABWE = 95
}

/** Properties of a Player. */
export interface IPlayer {

    /** Player id */
    id: string;

    /** Player commentaryId */
    commentaryId?: (string|null);

    /** Player name */
    name: string;

    /** Player kitName */
    kitName: string;

    /** Player age */
    age: number;

    /** Player nationality */
    nationality: Country;

    /** Player preferredFoot */
    preferredFoot: Foot;

    /** Player physique */
    physique: IPhysique;

    /** Player abilities */
    abilities: IPlayerAbilities;

    /** Player motion */
    motion: IPlayerMotion;

    /** Player isEdited */
    isEdited: boolean;

    /** Player isBaseCopy */
    isBaseCopy: boolean;

    /** Player edited */
    edited?: (IEdits|null);

    /** Player registeredPosition */
    registeredPosition: Position;

    /** Player playingStyle */
    playingStyle: PlayingStyle;

    /** Player playablePositions */
    playablePositions?: (Position[]|null);

    /** Player comPlayingStyles */
    comPlayingStyles?: (ComPlayingStyle[]|null);

    /** Player playerSkills */
    playerSkills?: (Skill[]|null);

    /** Player appearance */
    appearance: IPlayerAppearance;

    /** Player unknowns */
    unknowns?: (IUnknownOptions|null);
}

/** Represents a Player. */
export class Player implements IPlayer {

    /**
     * Constructs a new Player.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPlayer);

    /** Player id. */
    public id: string;

    /** Player commentaryId. */
    public commentaryId: string;

    /** Player name. */
    public name: string;

    /** Player kitName. */
    public kitName: string;

    /** Player age. */
    public age: number;

    /** Player nationality. */
    public nationality: Country;

    /** Player preferredFoot. */
    public preferredFoot: Foot;

    /** Player physique. */
    public physique: IPhysique;

    /** Player abilities. */
    public abilities: IPlayerAbilities;

    /** Player motion. */
    public motion: IPlayerMotion;

    /** Player isEdited. */
    public isEdited: boolean;

    /** Player isBaseCopy. */
    public isBaseCopy: boolean;

    /** Player edited. */
    public edited?: (IEdits|null);

    /** Player registeredPosition. */
    public registeredPosition: Position;

    /** Player playingStyle. */
    public playingStyle: PlayingStyle;

    /** Player playablePositions. */
    public playablePositions: Position[];

    /** Player comPlayingStyles. */
    public comPlayingStyles: ComPlayingStyle[];

    /** Player playerSkills. */
    public playerSkills: Skill[];

    /** Player appearance. */
    public appearance: IPlayerAppearance;

    /** Player unknowns. */
    public unknowns?: (IUnknownOptions|null);

    /**
     * Creates a new Player instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Player instance
     */
    public static create(properties?: IPlayer): Player;

    /**
     * Encodes the specified Player message. Does not implicitly {@link Player.verify|verify} messages.
     * @param message Player message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Player message, length delimited. Does not implicitly {@link Player.verify|verify} messages.
     * @param message Player message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Player message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Player
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Player;

    /**
     * Decodes a Player message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Player
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Player;

    /**
     * Verifies a Player message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Player message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Player
     */
    public static fromObject(object: { [k: string]: any }): Player;

    /**
     * Creates a plain object from a Player message. Also converts values to other types if specified.
     * @param message Player
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Player, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Player to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Physique. */
export interface IPhysique {

    /** Physique height */
    height: number;

    /** Physique weight */
    weight: number;

    /** Physique neckLength */
    neckLength?: (number|null);

    /** Physique neckSize */
    neckSize?: (number|null);

    /** Physique shoulderHeight */
    shoulderHeight?: (number|null);

    /** Physique shoulderWidth */
    shoulderWidth?: (number|null);

    /** Physique chestSize */
    chestSize?: (number|null);

    /** Physique waistSize */
    waistSize?: (number|null);

    /** Physique armSize */
    armSize?: (number|null);

    /** Physique thighSize */
    thighSize?: (number|null);

    /** Physique calfSize */
    calfSize?: (number|null);

    /** Physique legLength */
    legLength?: (number|null);

    /** Physique armLength */
    armLength?: (number|null);
}

/** Represents a Physique. */
export class Physique implements IPhysique {

    /**
     * Constructs a new Physique.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPhysique);

    /** Physique height. */
    public height: number;

    /** Physique weight. */
    public weight: number;

    /** Physique neckLength. */
    public neckLength: number;

    /** Physique neckSize. */
    public neckSize: number;

    /** Physique shoulderHeight. */
    public shoulderHeight: number;

    /** Physique shoulderWidth. */
    public shoulderWidth: number;

    /** Physique chestSize. */
    public chestSize: number;

    /** Physique waistSize. */
    public waistSize: number;

    /** Physique armSize. */
    public armSize: number;

    /** Physique thighSize. */
    public thighSize: number;

    /** Physique calfSize. */
    public calfSize: number;

    /** Physique legLength. */
    public legLength: number;

    /** Physique armLength. */
    public armLength: number;

    /**
     * Creates a new Physique instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Physique instance
     */
    public static create(properties?: IPhysique): Physique;

    /**
     * Encodes the specified Physique message. Does not implicitly {@link Physique.verify|verify} messages.
     * @param message Physique message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPhysique, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Physique message, length delimited. Does not implicitly {@link Physique.verify|verify} messages.
     * @param message Physique message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPhysique, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Physique message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Physique
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Physique;

    /**
     * Decodes a Physique message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Physique
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Physique;

    /**
     * Verifies a Physique message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Physique message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Physique
     */
    public static fromObject(object: { [k: string]: any }): Physique;

    /**
     * Creates a plain object from a Physique message. Also converts values to other types if specified.
     * @param message Physique
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Physique, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Physique to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a PlayerAbilities. */
export interface IPlayerAbilities {

    /** PlayerAbilities attackingProwess */
    attackingProwess: number;

    /** PlayerAbilities ballControl */
    ballControl: number;

    /** PlayerAbilities ballWinning */
    ballWinning: number;

    /** PlayerAbilities bodyControl */
    bodyControl: number;

    /** PlayerAbilities catching */
    catching: number;

    /** PlayerAbilities clearing */
    clearing: number;

    /** PlayerAbilities coverage */
    coverage: number;

    /** PlayerAbilities defensiveProwess */
    defensiveProwess: number;

    /** PlayerAbilities dribbling */
    dribbling: number;

    /** PlayerAbilities explosivePower */
    explosivePower: number;

    /** PlayerAbilities finishing */
    finishing: number;

    /** PlayerAbilities goalkeeping */
    goalkeeping: number;

    /** PlayerAbilities header */
    header: number;

    /** PlayerAbilities injuryResistance */
    injuryResistance: number;

    /** PlayerAbilities jump */
    jump: number;

    /** PlayerAbilities kickingPower */
    kickingPower: number;

    /** PlayerAbilities loftedPass */
    loftedPass: number;

    /** PlayerAbilities lowPass */
    lowPass: number;

    /** PlayerAbilities physicalContact */
    physicalContact: number;

    /** PlayerAbilities placeKicking */
    placeKicking: number;

    /** PlayerAbilities reflexes */
    reflexes: number;

    /** PlayerAbilities speed */
    speed: number;

    /** PlayerAbilities stamina */
    stamina: number;

    /** PlayerAbilities swerve */
    swerve: number;

    /** PlayerAbilities weakFootAccuracy */
    weakFootAccuracy: number;

    /** PlayerAbilities weakFootUsage */
    weakFootUsage: number;

    /** PlayerAbilities form */
    form: number;
}

/** Represents a PlayerAbilities. */
export class PlayerAbilities implements IPlayerAbilities {

    /**
     * Constructs a new PlayerAbilities.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPlayerAbilities);

    /** PlayerAbilities attackingProwess. */
    public attackingProwess: number;

    /** PlayerAbilities ballControl. */
    public ballControl: number;

    /** PlayerAbilities ballWinning. */
    public ballWinning: number;

    /** PlayerAbilities bodyControl. */
    public bodyControl: number;

    /** PlayerAbilities catching. */
    public catching: number;

    /** PlayerAbilities clearing. */
    public clearing: number;

    /** PlayerAbilities coverage. */
    public coverage: number;

    /** PlayerAbilities defensiveProwess. */
    public defensiveProwess: number;

    /** PlayerAbilities dribbling. */
    public dribbling: number;

    /** PlayerAbilities explosivePower. */
    public explosivePower: number;

    /** PlayerAbilities finishing. */
    public finishing: number;

    /** PlayerAbilities goalkeeping. */
    public goalkeeping: number;

    /** PlayerAbilities header. */
    public header: number;

    /** PlayerAbilities injuryResistance. */
    public injuryResistance: number;

    /** PlayerAbilities jump. */
    public jump: number;

    /** PlayerAbilities kickingPower. */
    public kickingPower: number;

    /** PlayerAbilities loftedPass. */
    public loftedPass: number;

    /** PlayerAbilities lowPass. */
    public lowPass: number;

    /** PlayerAbilities physicalContact. */
    public physicalContact: number;

    /** PlayerAbilities placeKicking. */
    public placeKicking: number;

    /** PlayerAbilities reflexes. */
    public reflexes: number;

    /** PlayerAbilities speed. */
    public speed: number;

    /** PlayerAbilities stamina. */
    public stamina: number;

    /** PlayerAbilities swerve. */
    public swerve: number;

    /** PlayerAbilities weakFootAccuracy. */
    public weakFootAccuracy: number;

    /** PlayerAbilities weakFootUsage. */
    public weakFootUsage: number;

    /** PlayerAbilities form. */
    public form: number;

    /**
     * Creates a new PlayerAbilities instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PlayerAbilities instance
     */
    public static create(properties?: IPlayerAbilities): PlayerAbilities;

    /**
     * Encodes the specified PlayerAbilities message. Does not implicitly {@link PlayerAbilities.verify|verify} messages.
     * @param message PlayerAbilities message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPlayerAbilities, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PlayerAbilities message, length delimited. Does not implicitly {@link PlayerAbilities.verify|verify} messages.
     * @param message PlayerAbilities message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPlayerAbilities, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PlayerAbilities message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PlayerAbilities
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PlayerAbilities;

    /**
     * Decodes a PlayerAbilities message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PlayerAbilities
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PlayerAbilities;

    /**
     * Verifies a PlayerAbilities message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PlayerAbilities message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PlayerAbilities
     */
    public static fromObject(object: { [k: string]: any }): PlayerAbilities;

    /**
     * Creates a plain object from a PlayerAbilities message. Also converts values to other types if specified.
     * @param message PlayerAbilities
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PlayerAbilities, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PlayerAbilities to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Foot enum. */
export enum Foot {
    RIGHT = 0,
    LEFT = 1
}

/** PlayingStyle enum. */
export enum PlayingStyle {
    ANCHOR_MAN = 8,
    BOX_TO_BOX = 7,
    BUILD_UP = 15,
    CLASSIC_NO_10 = 5,
    CREATIVE_PLAYMAKER = 14,
    DEFENSIVE_FULLBACK = 12,
    DEFENSIVE_GOALKEEPER = 18,
    DUMMY_RUNNER = 2,
    EXTRA_FRONTMAN = 10,
    FOX_IN_THE_BOX = 3,
    GOAL_POACHER = 1,
    HOLE_PLAYER = 6,
    N_A = 16,
    OFFENSIVE_FULLBACK = 11,
    OFFENSIVE_GOALKEEPER = 17,
    PROLIFIC_WINGER = 4,
    TARGET_MAN = 13,
    THE_DESTROYER = 9
}

/** ComPlayingStyle enum. */
export enum ComPlayingStyle {
    EARLY_CROSS = 5,
    INCISIVE_RUN = 3,
    LONG_BALL_EXPERT = 4,
    LONG_RANGER = 6,
    MAZING_RUN = 1,
    SPEEDING_BULLET = 2,
    TRICKSTER = 0
}

/** Position enum. */
export enum Position {
    ATTACKING_MIDFIELDER = 8,
    CENTRE_BACK = 1,
    CENTRE_FORWARD = 12,
    CENTRE_MIDFIELDER = 5,
    DEFENSIVE_MIDFIELDER = 4,
    GOALKEEPER = 0,
    LEFT_BACK = 2,
    LEFT_MIDFIELDER = 6,
    LEFT_WING_FORWARD = 9,
    RIGHT_BACK = 3,
    RIGHT_MIDFIELDER = 7,
    RIGHT_WING_FORWARD = 10,
    SECOND_STRIKER = 11
}

/** Skill enum. */
export enum Skill {
    ACROBATIC_CLEAR = 24,
    ACROBATIC_FINISHING = 9,
    CAPTAINCY = 25,
    CUT_BEHIND_TURN = 4,
    FIGHTING_SPIRIT = 27,
    FIRST_TIME_SHOT = 11,
    FLIP_FLAP = 1,
    GK_LONG_THROW = 20,
    HEADING = 6,
    HEEL_TRICK = 10,
    KNUCKLE_SHOT = 8,
    LONG_RANGE_DRIVE = 7,
    LONG_THROW = 19,
    LOW_LOFTED_PASS = 17,
    LOW_PUNT_TRAJECTORY = 18,
    MALICIA = 21,
    MAN_MARKING = 22,
    MARSEILLE_TURN = 2,
    ONE_TOUCH_PASS = 12,
    OUTSIDE_CURLER = 15,
    PINPOINT_CROSSING = 14,
    RABONA = 16,
    SCISSORS_FEINT = 0,
    SCOTCH_MOVE = 5,
    SOMBRERO = 3,
    SUPER_SUB = 26,
    TRACK_BACK = 23,
    WEIGHTED_PASS = 13
}

/** Properties of a PlayerAppearance. */
export interface IPlayerAppearance {
}

/** Represents a PlayerAppearance. */
export class PlayerAppearance implements IPlayerAppearance {

    /**
     * Constructs a new PlayerAppearance.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPlayerAppearance);

    /**
     * Creates a new PlayerAppearance instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PlayerAppearance instance
     */
    public static create(properties?: IPlayerAppearance): PlayerAppearance;

    /**
     * Encodes the specified PlayerAppearance message. Does not implicitly {@link PlayerAppearance.verify|verify} messages.
     * @param message PlayerAppearance message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPlayerAppearance, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PlayerAppearance message, length delimited. Does not implicitly {@link PlayerAppearance.verify|verify} messages.
     * @param message PlayerAppearance message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPlayerAppearance, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PlayerAppearance message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PlayerAppearance
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PlayerAppearance;

    /**
     * Decodes a PlayerAppearance message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PlayerAppearance
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PlayerAppearance;

    /**
     * Verifies a PlayerAppearance message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PlayerAppearance message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PlayerAppearance
     */
    public static fromObject(object: { [k: string]: any }): PlayerAppearance;

    /**
     * Creates a plain object from a PlayerAppearance message. Also converts values to other types if specified.
     * @param message PlayerAppearance
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PlayerAppearance, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PlayerAppearance to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a PlayerMotion. */
export interface IPlayerMotion {

    /** PlayerMotion armDribbling */
    armDribbling?: (number|null);

    /** PlayerMotion armRunning */
    armRunning?: (number|null);

    /** PlayerMotion cornerKick */
    cornerKick?: (number|null);

    /** PlayerMotion freeKick */
    freeKick?: (number|null);

    /** PlayerMotion goalCelebration1 */
    goalCelebration1?: (number|null);

    /** PlayerMotion goalCelebration2 */
    goalCelebration2?: (number|null);

    /** PlayerMotion hunchingDribbling */
    hunchingDribbling?: (number|null);

    /** PlayerMotion hunchingRunning */
    hunchingRunning?: (number|null);

    /** PlayerMotion penaltyKick */
    penaltyKick?: (number|null);
}

/** Represents a PlayerMotion. */
export class PlayerMotion implements IPlayerMotion {

    /**
     * Constructs a new PlayerMotion.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPlayerMotion);

    /** PlayerMotion armDribbling. */
    public armDribbling: number;

    /** PlayerMotion armRunning. */
    public armRunning: number;

    /** PlayerMotion cornerKick. */
    public cornerKick: number;

    /** PlayerMotion freeKick. */
    public freeKick: number;

    /** PlayerMotion goalCelebration1. */
    public goalCelebration1: number;

    /** PlayerMotion goalCelebration2. */
    public goalCelebration2: number;

    /** PlayerMotion hunchingDribbling. */
    public hunchingDribbling: number;

    /** PlayerMotion hunchingRunning. */
    public hunchingRunning: number;

    /** PlayerMotion penaltyKick. */
    public penaltyKick: number;

    /**
     * Creates a new PlayerMotion instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PlayerMotion instance
     */
    public static create(properties?: IPlayerMotion): PlayerMotion;

    /**
     * Encodes the specified PlayerMotion message. Does not implicitly {@link PlayerMotion.verify|verify} messages.
     * @param message PlayerMotion message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPlayerMotion, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PlayerMotion message, length delimited. Does not implicitly {@link PlayerMotion.verify|verify} messages.
     * @param message PlayerMotion message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPlayerMotion, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PlayerMotion message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PlayerMotion
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PlayerMotion;

    /**
     * Decodes a PlayerMotion message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PlayerMotion
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PlayerMotion;

    /**
     * Verifies a PlayerMotion message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PlayerMotion message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PlayerMotion
     */
    public static fromObject(object: { [k: string]: any }): PlayerMotion;

    /**
     * Creates a plain object from a PlayerMotion message. Also converts values to other types if specified.
     * @param message PlayerMotion
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PlayerMotion, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PlayerMotion to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an Edits. */
export interface IEdits {

    /** Edits registeredPosition */
    registeredPosition?: (boolean|null);

    /** Edits playablePositions */
    playablePositions?: (boolean|null);

    /** Edits basics */
    basics?: (boolean|null);

    /** Edits abilities */
    abilities?: (boolean|null);

    /** Edits playerSkills */
    playerSkills?: (boolean|null);

    /** Edits playingStyle */
    playingStyle?: (boolean|null);

    /** Edits comPlayingStyles */
    comPlayingStyles?: (boolean|null);

    /** Edits motion */
    motion?: (boolean|null);
}

/** Reports if certain parts of a player are edited. */
export class Edits implements IEdits {

    /**
     * Constructs a new Edits.
     * @param [properties] Properties to set
     */
    constructor(properties?: IEdits);

    /** Edits registeredPosition. */
    public registeredPosition: boolean;

    /** Edits playablePositions. */
    public playablePositions: boolean;

    /** Edits basics. */
    public basics: boolean;

    /** Edits abilities. */
    public abilities: boolean;

    /** Edits playerSkills. */
    public playerSkills: boolean;

    /** Edits playingStyle. */
    public playingStyle: boolean;

    /** Edits comPlayingStyles. */
    public comPlayingStyles: boolean;

    /** Edits motion. */
    public motion: boolean;

    /**
     * Creates a new Edits instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Edits instance
     */
    public static create(properties?: IEdits): Edits;

    /**
     * Encodes the specified Edits message. Does not implicitly {@link Edits.verify|verify} messages.
     * @param message Edits message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IEdits, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Edits message, length delimited. Does not implicitly {@link Edits.verify|verify} messages.
     * @param message Edits message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IEdits, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an Edits message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Edits
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Edits;

    /**
     * Decodes an Edits message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Edits
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Edits;

    /**
     * Verifies an Edits message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an Edits message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Edits
     */
    public static fromObject(object: { [k: string]: any }): Edits;

    /**
     * Creates a plain object from an Edits message. Also converts values to other types if specified.
     * @param message Edits
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Edits, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Edits to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an UnknownOptions. */
export interface IUnknownOptions {

    /** UnknownOptions unknown02 */
    unknown02?: (boolean|null);

    /** UnknownOptions unknown03 */
    unknown03?: (boolean|null);

    /** UnknownOptions unknown04 */
    unknown04?: (boolean|null);

    /** UnknownOptions unknown05 */
    unknown05?: (boolean|null);

    /** UnknownOptions unknown06 */
    unknown06?: (number|null);
}

/** Bytes/bits of the player data that are not yet known */
export class UnknownOptions implements IUnknownOptions {

    /**
     * Constructs a new UnknownOptions.
     * @param [properties] Properties to set
     */
    constructor(properties?: IUnknownOptions);

    /** UnknownOptions unknown02. */
    public unknown02: boolean;

    /** UnknownOptions unknown03. */
    public unknown03: boolean;

    /** UnknownOptions unknown04. */
    public unknown04: boolean;

    /** UnknownOptions unknown05. */
    public unknown05: boolean;

    /** UnknownOptions unknown06. */
    public unknown06: number;

    /**
     * Creates a new UnknownOptions instance using the specified properties.
     * @param [properties] Properties to set
     * @returns UnknownOptions instance
     */
    public static create(properties?: IUnknownOptions): UnknownOptions;

    /**
     * Encodes the specified UnknownOptions message. Does not implicitly {@link UnknownOptions.verify|verify} messages.
     * @param message UnknownOptions message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IUnknownOptions, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified UnknownOptions message, length delimited. Does not implicitly {@link UnknownOptions.verify|verify} messages.
     * @param message UnknownOptions message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IUnknownOptions, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an UnknownOptions message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns UnknownOptions
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UnknownOptions;

    /**
     * Decodes an UnknownOptions message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns UnknownOptions
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UnknownOptions;

    /**
     * Verifies an UnknownOptions message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an UnknownOptions message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns UnknownOptions
     */
    public static fromObject(object: { [k: string]: any }): UnknownOptions;

    /**
     * Creates a plain object from an UnknownOptions message. Also converts values to other types if specified.
     * @param message UnknownOptions
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: UnknownOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this UnknownOptions to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
