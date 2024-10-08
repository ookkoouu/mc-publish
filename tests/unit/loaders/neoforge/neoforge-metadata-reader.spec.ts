import { zipFile } from "@/../tests/utils/zip-utils";
import { vol } from "memfs";
import { NeoForgeMetadata } from "@/loaders/neoforge/neoforge-metadata";
import { NeoForgeMetadataReader } from "@/loaders/neoforge/neoforge-metadata-reader";

beforeEach(() => {
    vol.fromJSON({
        "neoforge.mod.jar": zipFile([__dirname, "../../../content/neoforge/neoforge.mods.toml"], "META-INF/neoforge.mods.toml"),
        "text.txt": "",
    });
});

describe("NeoForgeMetadataReader", () => {
    test("successfully reads neoforge.mods.toml", async () => {
        const reader = new NeoForgeMetadataReader();

        const metadata = await reader.readMetadataFile("neoforge.mod.jar");

        expect(metadata).toBeInstanceOf(NeoForgeMetadata);
    });

    test("throws if file is not a NeoForge mod", async () => {
        const reader = new NeoForgeMetadataReader();

        await expect(reader.readMetadataFile("text.txt")).rejects.toThrow();
    });

    test("throws if file does not exist", async () => {
        const reader = new NeoForgeMetadataReader();

        await expect(reader.readMetadataFile("text.json")).rejects.toThrow();
    });
});
