.PHONY: proto clean

# Generate protobuf files for Go and TypeScript
proto:
	mkdir -p server/gen
	mkdir -p client/src/generated
	protoc \
        --proto_path=proto \
        --go_out=server/gen \
        --go_opt=paths=source_relative \
        --go-grpc_out=server/gen \
        --go-grpc_opt=paths=source_relative \
        proto/*.proto
	cd client && pnpm run proto:generate

# Clean generated protobuf files
clean:
	rm -rf server/gen
	cd client && pnpm run proto:clean
